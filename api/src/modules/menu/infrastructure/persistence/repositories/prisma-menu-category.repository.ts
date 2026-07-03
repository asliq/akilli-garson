import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma.service';
import {
  ListMenuCategoriesOptions,
  MenuCategoryRepositoryPort,
} from '../../../application/ports/menu-category.repository.port';
import { MenuCategory } from '../../../domain/entities/menu-category.entity';
import { PrismaTransactionContext } from '../context/prisma-transaction.context';
import {
  activeTenantWhere,
  branchScopeWhere,
  tenantWhere,
} from '../filters/persistence.filters';
import { assertOptimisticLock } from '../helpers/optimistic-lock.helper';
import { runInRepositoryTransaction } from '../helpers/repository-transaction.helper';
import { MenuCategoryMapper } from '../mappers/menu-category.mapper';
import { PrismaTransactionClient } from '../types/prisma-transaction.client';

@Injectable()
export class PrismaMenuCategoryRepository implements MenuCategoryRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  private get client(): PrismaTransactionClient {
    return PrismaTransactionContext.getClient(this.prisma);
  }

  async findById(restaurantId: string, id: string): Promise<MenuCategory | null> {
    const record = await this.client.menuCategory.findFirst({
      where: {
        ...activeTenantWhere(restaurantId),
        id,
      },
    });

    return record ? MenuCategoryMapper.toDomain(record) : null;
  }

  async findMany(
    restaurantId: string,
    options?: ListMenuCategoriesOptions,
  ): Promise<MenuCategory[]> {
    const records = await this.client.menuCategory.findMany({
      where: {
        ...activeTenantWhere(restaurantId),
        ...(options?.branchId !== undefined ? branchScopeWhere(options.branchId) : {}),
      },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return records.map((record) => MenuCategoryMapper.toDomain(record));
  }

  async findBySlug(restaurantId: string, slug: string): Promise<MenuCategory | null> {
    const record = await this.client.menuCategory.findFirst({
      where: {
        ...activeTenantWhere(restaurantId),
        slug,
      },
    });

    return record ? MenuCategoryMapper.toDomain(record) : null;
  }

  async findByNameAndBranch(
    restaurantId: string,
    branchId: string,
    name: string,
  ): Promise<MenuCategory | null> {
    const record = await this.client.menuCategory.findFirst({
      where: {
        ...activeTenantWhere(restaurantId),
        branchId,
        name,
      },
    });

    return record ? MenuCategoryMapper.toDomain(record) : null;
  }

  async getMaxDisplayOrder(restaurantId: string, branchId: string | null): Promise<number> {
    const result = await this.client.menuCategory.aggregate({
      where: {
        ...activeTenantWhere(restaurantId),
        ...branchScopeWhere(branchId),
      },
      _max: {
        displayOrder: true,
      },
    });

    return result._max.displayOrder ?? 0;
  }

  async save(category: MenuCategory): Promise<MenuCategory> {
    await runInRepositoryTransaction(this.prisma, async () => {
      await this.persist(category);
    });

    return category;
  }

  private async persist(category: MenuCategory): Promise<void> {
    const client = this.client;
    const existing = await client.menuCategory.findFirst({
      where: {
        ...tenantWhere(category.restaurantId),
        id: category.id,
      },
      select: { id: true },
    });

    if (!existing) {
      await client.menuCategory.create({
        data: MenuCategoryMapper.toCreateInput(category),
      });
      return;
    }

    const result = await client.menuCategory.updateMany({
      where: {
        id: category.id,
        restaurantId: category.restaurantId,
        version: category.version - 1,
      },
      data: MenuCategoryMapper.toUpdateManyMutationInput(category),
    });

    assertOptimisticLock(result.count, {
      entityType: 'MenuCategory',
      id: category.id,
      expectedVersion: category.version - 1,
    });
  }
}
