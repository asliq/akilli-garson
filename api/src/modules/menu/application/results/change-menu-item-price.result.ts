import { MenuItem } from '../../domain/entities/menu-item.entity';

export class ChangeMenuItemPriceResult {
  menuItemId!: string;
  priceId!: string;
  amountMinor!: string;
  currencyCode!: string;
  version!: number;
  updatedAt!: Date;

  static fromDomain(item: MenuItem, priceId: string): ChangeMenuItemPriceResult {
    const basePrice = item.getBasePrice();

    return {
      menuItemId: item.id,
      priceId,
      amountMinor: basePrice?.amount.amountMinor.toString() ?? '0',
      currencyCode: basePrice?.amount.currencyCode ?? 'TRY',
      version: item.version,
      updatedAt: item.updatedAt,
    };
  }
}
