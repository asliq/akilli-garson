import { MenuItemStatus } from '../enums/menu-item-status.enum';
import { MenuItemType } from '../enums/menu-item-type.enum';
import { MenuItem } from '../entities/menu-item.entity';
import { MenuPrice } from '../entities/menu-price.entity';
import { Money } from './money.vo';

export interface MenuItemSnapshotProps {
  menuItemId: string;
  restaurantId: string;
  sku: string;
  name: string;
  slug: string | null;
  itemType: MenuItemType;
  status: MenuItemStatus;
  unitPrice: Money;
  taxCategoryId: string | null;
  kitchenStationId: string | null;
  capturedAt: Date;
}

export class MenuItemSnapshot {
  private constructor(private readonly props: MenuItemSnapshotProps) {}

  static capture(item: MenuItem, price: MenuPrice): MenuItemSnapshot {
    return new MenuItemSnapshot({
      menuItemId: item.id,
      restaurantId: item.restaurantId,
      sku: item.sku.value,
      name: item.name,
      slug: item.slug?.value ?? null,
      itemType: item.itemType,
      status: item.status,
      unitPrice: price.amount,
      taxCategoryId: item.taxCategoryId,
      kitchenStationId: item.kitchenStationId,
      capturedAt: new Date(),
    });
  }

  get menuItemId(): string {
    return this.props.menuItemId;
  }

  get restaurantId(): string {
    return this.props.restaurantId;
  }

  get sku(): string {
    return this.props.sku;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string | null {
    return this.props.slug;
  }

  get itemType(): MenuItemType {
    return this.props.itemType;
  }

  get status(): MenuItemStatus {
    return this.props.status;
  }

  get unitPrice(): Money {
    return this.props.unitPrice;
  }

  get taxCategoryId(): string | null {
    return this.props.taxCategoryId;
  }

  get kitchenStationId(): string | null {
    return this.props.kitchenStationId;
  }

  get capturedAt(): Date {
    return this.props.capturedAt;
  }

  toJSON(): Record<string, unknown> {
    return {
      menuItemId: this.menuItemId,
      restaurantId: this.restaurantId,
      sku: this.sku,
      name: this.name,
      slug: this.slug,
      itemType: this.itemType,
      status: this.status,
      unitPrice: this.unitPrice.toJSON(),
      taxCategoryId: this.taxCategoryId,
      kitchenStationId: this.kitchenStationId,
      capturedAt: this.capturedAt.toISOString(),
    };
  }
}
