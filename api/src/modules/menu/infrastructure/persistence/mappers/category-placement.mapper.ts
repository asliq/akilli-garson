import { MenuCategoryPlacement as PrismaMenuCategoryPlacement, Prisma } from '@prisma/client';
import { CategoryPlacement } from '../../../domain/entities/category-placement.entity';
import { DisplayOrder } from '../../../domain/value-objects/display-order.vo';

export class CategoryPlacementMapper {
  static toDomain(record: PrismaMenuCategoryPlacement): CategoryPlacement {
    return CategoryPlacement.reconstitute({
      id: record.id,
      restaurantId: record.restaurantId,
      categoryId: record.categoryId,
      menuItemId: record.menuItemId,
      displayOrder: DisplayOrder.create(record.displayOrder),
      isPrimary: record.isPrimary,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      createdBy: null,
      updatedBy: null,
    });
  }

  static toCreateInput(placement: CategoryPlacement): Prisma.MenuCategoryPlacementCreateInput {
    const props = placement.toProps();

    return {
      id: props.id,
      restaurant: { connect: { id: props.restaurantId } },
      category: { connect: { id: props.categoryId } },
      menuItem: { connect: { id: props.menuItemId } },
      displayOrder: props.displayOrder.value,
      isPrimary: props.isPrimary,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  static toUpdateInput(placement: CategoryPlacement): Prisma.MenuCategoryPlacementUpdateInput {
    return CategoryPlacementMapper.toUpdateManyMutationInput(placement);
  }

  static toUpdateManyMutationInput(
    placement: CategoryPlacement,
  ): Prisma.MenuCategoryPlacementUpdateManyMutationInput {
    const props = placement.toProps();

    return {
      displayOrder: props.displayOrder.value,
      isPrimary: props.isPrimary,
      updatedAt: props.updatedAt,
    };
  }
}
