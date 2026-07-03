import { randomUUID } from 'crypto';
import { MenuPriceStatus } from '../enums/menu-price-status.enum';
import { Money } from '../value-objects/money.vo';

export interface CreateMenuPriceProps {
  menuItemId: string;
  amount: Money;
  branchId?: string | null;
  salesChannelId?: string | null;
  priority?: number;
  validFrom?: Date | null;
  validTo?: Date | null;
  label?: string | null;
  createdBy?: string | null;
}

export interface MenuPriceProps {
  id: string;
  menuItemId: string;
  amount: Money;
  status: MenuPriceStatus;
  branchId: string | null;
  salesChannelId: string | null;
  priority: number;
  validFrom: Date | null;
  validTo: Date | null;
  label: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
}

export class MenuPrice {
  private constructor(private readonly props: MenuPriceProps) {}

  static createBase(props: CreateMenuPriceProps): MenuPrice {
    const now = new Date();

    return new MenuPrice({
      id: randomUUID(),
      menuItemId: props.menuItemId,
      amount: props.amount,
      status: MenuPriceStatus.ACTIVE,
      branchId: props.branchId ?? null,
      salesChannelId: props.salesChannelId ?? null,
      priority: props.priority ?? 0,
      validFrom: props.validFrom ?? null,
      validTo: props.validTo ?? null,
      label: props.label ?? null,
      createdAt: now,
      updatedAt: now,
      createdBy: props.createdBy ?? null,
      updatedBy: props.createdBy ?? null,
      version: 1,
    });
  }

  static reconstitute(props: MenuPriceProps): MenuPrice {
    return new MenuPrice(props);
  }

  isBasePrice(): boolean {
    return this.branchId === null && this.salesChannelId === null;
  }

  isActive(): boolean {
    return this.status === MenuPriceStatus.ACTIVE;
  }

  supersede(updatedBy?: string | null): MenuPrice {
    return MenuPrice.reconstitute({
      ...this.props,
      status: MenuPriceStatus.SUPERSEDED,
      updatedAt: new Date(),
      updatedBy: updatedBy ?? this.updatedBy,
      version: this.version + 1,
    });
  }

  withAmount(amount: Money, updatedBy?: string | null): MenuPrice {
    return MenuPrice.reconstitute({
      ...this.props,
      amount,
      updatedAt: new Date(),
      updatedBy: updatedBy ?? this.updatedBy,
      version: this.version + 1,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get menuItemId(): string {
    return this.props.menuItemId;
  }

  get amount(): Money {
    return this.props.amount;
  }

  get status(): MenuPriceStatus {
    return this.props.status;
  }

  get branchId(): string | null {
    return this.props.branchId;
  }

  get salesChannelId(): string | null {
    return this.props.salesChannelId;
  }

  get priority(): number {
    return this.props.priority;
  }

  get validFrom(): Date | null {
    return this.props.validFrom;
  }

  get validTo(): Date | null {
    return this.props.validTo;
  }

  get label(): string | null {
    return this.props.label;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get createdBy(): string | null {
    return this.props.createdBy;
  }

  get updatedBy(): string | null {
    return this.props.updatedBy;
  }

  get version(): number {
    return this.props.version;
  }

  toProps(): MenuPriceProps {
    return { ...this.props };
  }
}
