import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma.service';
import {
  ListMenuItemsOptions,
  MenuItemRepositoryPort,
} from '../../../application/ports/menu-item.repository.port';
import { MenuItem } from '../../../domain/entities/menu-item.entity';
import { MenuPrice } from '../../../domain/entities/menu-price.entity';
import { PrismaTransactionContext } from '../context/prisma-transaction.context';
import { activeTenantWhere, notDeletedWhere, tenantWhere } from '../filters/persistence.filters';
import { assertOptimisticLock } from '../helpers/optimistic-lock.helper';
import { runInRepositoryTransaction } from '../helpers/repository-transaction.helper';
import { MenuItemMapper } from '../mappers/menu-item.mapper';
import { MenuEnumMapper } from '../mappers/menu-enum.mapper';
import { MenuPriceMapper } from '../mappers/menu-price.mapper';
import { PrismaTransactionClient } from '../types/prisma-transaction.client';

const MENU_ITEM_INCLUDE = {
  prices: {
    where: notDeletedWhere(),
    orderBy: { createdAt: 'asc' as const },
  },
};

@Injectable()
export class PrismaMenuItemRepository implements MenuItemRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  private get client(): PrismaTransactionClient {
    return PrismaTransactionContext.getClient(this.prisma);
  }

  async findById(restaurantId: string, id: string): Promise<MenuItem | null> {
    const record = await this.client.menuItem.findFirst({
      where: {
        ...activeTenantWhere(restaurantId),
        id,
      },
      include: MENU_ITEM_INCLUDE,
    });

    return record ? MenuItemMapper.toDomain(record) : null;
  }

  async findBySku(restaurantId: string, sku: string): Promise<MenuItem | null> {
    const record = await this.client.menuItem.findFirst({
      where: {
        ...activeTenantWhere(restaurantId),
        sku,
      },
      include: MENU_ITEM_INCLUDE,
    });

    return record ? MenuItemMapper.toDomain(record) : null;
  }

  async findMany(restaurantId: string, options?: ListMenuItemsOptions): Promise<MenuItem[]> {
    const records = await this.client.menuItem.findMany({
      where: {
        ...activeTenantWhere(restaurantId),
        ...(options?.status
          ? { status: MenuEnumMapper.toPersistenceItemStatus(options.status) }
          : {}),
        ...(options?.categoryId
          ? {
              placements: {
                some: {
                  categoryId: options.categoryId,
                  restaurantId,
                },
              },
            }
          : {}),
      },
      include: MENU_ITEM_INCLUDE,
      orderBy: [{ name: 'asc' }, { createdAt: 'asc' }],
    });

    return records.map((record) => MenuItemMapper.toDomain(record));
  }

  async save(item: MenuItem): Promise<MenuItem> {
    await runInRepositoryTransaction(this.prisma, async () => {
      await this.persistItem(item);

      for (const price of item.prices) {
        await this.persistPrice(item.restaurantId, price);
      }
    });

    return item;
  }

  private async persistItem(item: MenuItem): Promise<void> {
    const client = this.client;
    const existing = await client.menuItem.findFirst({
      where: {
        ...tenantWhere(item.restaurantId),
        id: item.id,
      },
      select: { id: true },
    });

    if (!existing) {
      await client.menuItem.create({
        data: MenuItemMapper.toCreateInput(item),
      });
      return;
    }

    const result = await client.menuItem.updateMany({
      where: {
        id: item.id,
        restaurantId: item.restaurantId,
        version: item.version - 1,
      },
      data: MenuItemMapper.toUpdateManyMutationInput(item),
    });

    assertOptimisticLock(result.count, {
      entityType: 'MenuItem',
      id: item.id,
      expectedVersion: item.version - 1,
    });
  }

  private async persistPrice(restaurantId: string, price: MenuPrice): Promise<void> {
    const client = this.client;
    const existing = await client.menuPrice.findFirst({
      where: {
        ...tenantWhere(restaurantId),
        id: price.id,
      },
      select: { id: true },
    });

    if (!existing) {
      await client.menuPrice.create({
        data: MenuPriceMapper.toCreateInput(restaurantId, price),
      });
      return;
    }

    const result = await client.menuPrice.updateMany({
      where: {
        id: price.id,
        restaurantId,
        version: price.version - 1,
      },
      data: MenuPriceMapper.toUpdateManyMutationInput(price),
    });

    assertOptimisticLock(result.count, {
      entityType: 'MenuPrice',
      id: price.id,
      expectedVersion: price.version - 1,
    });
  }
}
