import { MenuItemType } from '@/modules/menu/domain/enums/menu-item-type.enum';

export interface OrderLineProps {
  id: string;
  lineNumber: number;
  quantity: number;
  unitPriceMinor: bigint;
  lineTotalMinor: bigint;
  currencyCode: string;
  menuItemId: string;
  sku: string;
  name: string;
  slug: string | null;
  itemType: MenuItemType;
  taxCategoryId: string | null;
  kitchenStationId: string | null;
  snapshotCapturedAt: Date;
  createdAt: Date;
}

export class OrderLine {
  private constructor(private readonly props: OrderLineProps) {}

  static reconstitute(props: OrderLineProps): OrderLine {
    return new OrderLine(props);
  }

  get id(): string {
    return this.props.id;
  }

  get lineNumber(): number {
    return this.props.lineNumber;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unitPriceMinor(): bigint {
    return this.props.unitPriceMinor;
  }

  get lineTotalMinor(): bigint {
    return this.props.lineTotalMinor;
  }

  get currencyCode(): string {
    return this.props.currencyCode;
  }

  get menuItemId(): string {
    return this.props.menuItemId;
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

  get taxCategoryId(): string | null {
    return this.props.taxCategoryId;
  }

  get kitchenStationId(): string | null {
    return this.props.kitchenStationId;
  }

  get snapshotCapturedAt(): Date {
    return this.props.snapshotCapturedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toProps(): OrderLineProps {
    return { ...this.props };
  }
}
