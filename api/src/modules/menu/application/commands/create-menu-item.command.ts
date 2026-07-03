import { MenuItemType } from '../../domain/enums/menu-item-type.enum';

export class CreateMenuItemCommand {
  constructor(
    public readonly name: string,
    public readonly sku: string,
    public readonly amountMinor: bigint | number,
    public readonly currencyCode?: string,
    public readonly slug?: string,
    public readonly description?: string,
    public readonly imageUrl?: string,
    public readonly itemType?: MenuItemType,
    public readonly taxCategoryId?: string,
    public readonly kitchenStationId?: string,
    public readonly preparationTimeSeconds?: number,
    public readonly caloriesKcal?: number,
  ) {}
}
