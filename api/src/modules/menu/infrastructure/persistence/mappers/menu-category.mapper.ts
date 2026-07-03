import { MenuCategory as PrismaMenuCategory, Prisma } from '@prisma/client';
import { MenuCategory } from '../../../domain/entities/menu-category.entity';
import { CategoryColor } from '../../../domain/value-objects/category-color.vo';
import { CategorySlug } from '../../../domain/value-objects/category-slug.vo';
import { DisplayOrder } from '../../../domain/value-objects/display-order.vo';
import { MenuEnumMapper } from './menu-enum.mapper';

export class MenuCategoryMapper {
  static toDomain(record: PrismaMenuCategory): MenuCategory {
    return MenuCategory.reconstitute({
      id: record.id,
      restaurantId: record.restaurantId,
      branchId: record.branchId,
      name: record.name,
      slug: CategorySlug.create(record.slug),
      description: record.description,
      icon: record.icon,
      color: record.color ? CategoryColor.create(record.color) : null,
      displayOrder: DisplayOrder.create(record.displayOrder),
      status: MenuEnumMapper.toDomainCategoryStatus(record.status),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      createdBy: record.createdBy,
      updatedBy: record.updatedBy,
      deletedAt: record.deletedAt,
      version: record.version,
    });
  }

  static toCreateInput(category: MenuCategory): Prisma.MenuCategoryCreateInput {
    const props = category.toProps();

    return {
      id: props.id,
      restaurant: { connect: { id: props.restaurantId } },
      branchId: props.branchId,
      name: props.name,
      slug: props.slug.value,
      description: props.description,
      icon: props.icon,
      color: props.color?.value ?? null,
      displayOrder: props.displayOrder.value,
      status: MenuEnumMapper.toPersistenceCategoryStatus(props.status),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      createdBy: props.createdBy,
      updatedBy: props.updatedBy,
      deletedAt: props.deletedAt,
      version: props.version,
    };
  }

  static toUpdateInput(category: MenuCategory): Prisma.MenuCategoryUpdateInput {
    return MenuCategoryMapper.toUpdateManyMutationInput(category);
  }

  static toUpdateManyMutationInput(
    category: MenuCategory,
  ): Prisma.MenuCategoryUpdateManyMutationInput {
    const props = category.toProps();

    return {
      branchId: props.branchId,
      name: props.name,
      slug: props.slug.value,
      description: props.description,
      icon: props.icon,
      color: props.color?.value ?? null,
      displayOrder: props.displayOrder.value,
      status: MenuEnumMapper.toPersistenceCategoryStatus(props.status),
      updatedAt: props.updatedAt,
      updatedBy: props.updatedBy,
      deletedAt: props.deletedAt,
      version: props.version,
    };
  }
}
