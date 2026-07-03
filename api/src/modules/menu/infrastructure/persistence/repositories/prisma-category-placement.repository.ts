import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma.service';
import { CategoryPlacementRepositoryPort } from '../../../application/ports/category-placement.repository.port';
import { CategoryPlacement } from '../../../domain/entities/category-placement.entity';
import { PrismaTransactionContext } from '../context/prisma-transaction.context';
import { tenantWhere } from '../filters/persistence.filters';
import { runInRepositoryTransaction } from '../helpers/repository-transaction.helper';
import { CategoryPlacementMapper } from '../mappers/category-placement.mapper';
import { PrismaTransactionClient } from '../types/prisma-transaction.client';

@Injectable()
export class PrismaCategoryPlacementRepository implements CategoryPlacementRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  private get client(): PrismaTransactionClient {
    return PrismaTransactionContext.getClient(this.prisma);
  }

  async findByMenuItemId(
    restaurantId: string,
    menuItemId: string,
  ): Promise<CategoryPlacement[]> {
    const records = await this.client.menuCategoryPlacement.findMany({
      where: {
        ...tenantWhere(restaurantId),
        menuItemId,
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return records.map((record) => CategoryPlacementMapper.toDomain(record));
  }

  async findByCategoryAndItem(
    restaurantId: string,
    categoryId: string,
    menuItemId: string,
  ): Promise<CategoryPlacement | null> {
    const record = await this.client.menuCategoryPlacement.findFirst({
      where: {
        ...tenantWhere(restaurantId),
        categoryId,
        menuItemId,
      },
    });

    return record ? CategoryPlacementMapper.toDomain(record) : null;
  }

  async save(placement: CategoryPlacement): Promise<CategoryPlacement> {
    await runInRepositoryTransaction(this.prisma, async () => {
      await this.persist(placement);
    });

    return placement;
  }

  async saveMany(placements: CategoryPlacement[]): Promise<CategoryPlacement[]> {
    if (placements.length === 0) {
      return placements;
    }

    await runInRepositoryTransaction(this.prisma, async () => {
      for (const placement of placements) {
        await this.persist(placement);
      }
    });

    return placements;
  }

  private async persist(placement: CategoryPlacement): Promise<void> {
    const client = this.client;
    const existing = await client.menuCategoryPlacement.findFirst({
      where: {
        ...tenantWhere(placement.restaurantId),
        id: placement.id,
      },
      select: { id: true },
    });

    if (!existing) {
      await client.menuCategoryPlacement.create({
        data: CategoryPlacementMapper.toCreateInput(placement),
      });
      return;
    }

    await client.menuCategoryPlacement.updateMany({
      where: {
        ...tenantWhere(placement.restaurantId),
        id: placement.id,
      },
      data: CategoryPlacementMapper.toUpdateManyMutationInput(placement),
    });
  }
}
