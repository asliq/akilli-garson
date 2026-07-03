import { MenuItem } from '../../domain/entities/menu-item.entity';
import { MenuItemStatus } from '../../domain/enums/menu-item-status.enum';
import { MenuItemType } from '../../domain/enums/menu-item-type.enum';

export class CreateMenuItemResult {
  id!: string;
  restaurantId!: string;
  name!: string;
  sku!: string;
  slug!: string | null;
  description!: string | null;
  imageUrl!: string | null;
  status!: MenuItemStatus;
  itemType!: MenuItemType;
  taxCategoryId!: string | null;
  kitchenStationId!: string | null;
  preparationTimeSeconds!: number | null;
  caloriesKcal!: number | null;
  basePriceMinor!: string;
  currencyCode!: string;
  version!: number;
  createdAt!: Date;

  static fromDomain(item: MenuItem): CreateMenuItemResult {
    const basePrice = item.getBasePrice();

    return {
      id: item.id,
      restaurantId: item.restaurantId,
      name: item.name,
      sku: item.sku.value,
      slug: item.slug?.value ?? null,
      description: item.description,
      imageUrl: item.imageUrl,
      status: item.status,
      itemType: item.itemType,
      taxCategoryId: item.taxCategoryId,
      kitchenStationId: item.kitchenStationId,
      preparationTimeSeconds: item.preparationTimeSeconds,
      caloriesKcal: item.caloriesKcal,
      basePriceMinor: basePrice?.amount.amountMinor.toString() ?? '0',
      currencyCode: basePrice?.amount.currencyCode ?? 'TRY',
      version: item.version,
      createdAt: item.createdAt,
    };
  }
}
