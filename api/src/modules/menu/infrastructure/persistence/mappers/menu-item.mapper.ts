import { MenuItem as PrismaMenuItem, MenuPrice as PrismaMenuPrice, Prisma } from '@prisma/client';
import { MenuItem } from '../../../domain/entities/menu-item.entity';
import { MenuItemSlug } from '../../../domain/value-objects/menu-item-slug.vo';
import { Sku } from '../../../domain/value-objects/sku.vo';
import { MenuEnumMapper } from './menu-enum.mapper';
import { MenuPriceMapper } from './menu-price.mapper';

type PrismaMenuItemWithPrices = PrismaMenuItem & {
  prices: PrismaMenuPrice[];
};

export class MenuItemMapper {
  static toDomain(record: PrismaMenuItemWithPrices): MenuItem {
    return MenuItem.reconstitute({
      id: record.id,
      restaurantId: record.restaurantId,
      itemType: MenuEnumMapper.toDomainItemType(record.itemType),
      status: MenuEnumMapper.toDomainItemStatus(record.status),
      sku: Sku.create(record.sku),
      name: record.name,
      slug: MenuItemSlug.createOptional(record.slug),
      description: record.description,
      imageUrl: record.imageUrl,
      taxCategoryId: record.taxCategoryId,
      kitchenStationId: record.kitchenStationId,
      preparationTimeSeconds: record.preparationTimeSeconds,
      caloriesKcal: record.caloriesKcal,
      prices: record.prices.map((price) => MenuPriceMapper.toDomain(price)),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      createdBy: record.createdBy,
      updatedBy: record.updatedBy,
      deletedAt: record.deletedAt,
      version: record.version,
    });
  }

  static toCreateInput(item: MenuItem): Prisma.MenuItemCreateInput {
    const props = item.toProps();

    return {
      id: props.id,
      restaurant: { connect: { id: props.restaurantId } },
      itemType: MenuEnumMapper.toPersistenceItemType(props.itemType),
      status: MenuEnumMapper.toPersistenceItemStatus(props.status),
      sku: props.sku.value,
      name: props.name,
      slug: props.slug?.value ?? null,
      description: props.description,
      imageUrl: props.imageUrl,
      taxCategoryId: props.taxCategoryId,
      kitchenStationId: props.kitchenStationId,
      preparationTimeSeconds: props.preparationTimeSeconds,
      caloriesKcal: props.caloriesKcal,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      createdBy: props.createdBy,
      updatedBy: props.updatedBy,
      deletedAt: props.deletedAt,
      version: props.version,
    };
  }

  static toUpdateInput(item: MenuItem): Prisma.MenuItemUpdateInput {
    return MenuItemMapper.toUpdateManyMutationInput(item);
  }

  static toUpdateManyMutationInput(item: MenuItem): Prisma.MenuItemUpdateManyMutationInput {
    const props = item.toProps();

    return {
      itemType: MenuEnumMapper.toPersistenceItemType(props.itemType),
      status: MenuEnumMapper.toPersistenceItemStatus(props.status),
      sku: props.sku.value,
      name: props.name,
      slug: props.slug?.value ?? null,
      description: props.description,
      imageUrl: props.imageUrl,
      taxCategoryId: props.taxCategoryId,
      kitchenStationId: props.kitchenStationId,
      preparationTimeSeconds: props.preparationTimeSeconds,
      caloriesKcal: props.caloriesKcal,
      updatedAt: props.updatedAt,
      updatedBy: props.updatedBy,
      deletedAt: props.deletedAt,
      version: props.version,
    };
  }
}
