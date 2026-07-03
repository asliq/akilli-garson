import { DomainEvent } from '@/core/events/domain-event.interface';
import { DomainException } from '@/shared/exceptions/domain.exception';
import { MenuItemStatus } from '../enums/menu-item-status.enum';
import { MenuItemType } from '../enums/menu-item-type.enum';
import { MenuPrice } from './menu-price.entity';
import { MenuItemInvariants } from '../invariants/menu-item.invariants';
import { MenuItemActivatedEvent } from '../events/menu-item-activated.event';
import { MenuItemCreatedEvent } from '../events/menu-item-created.event';
import { MenuPriceChangedEvent } from '../events/menu-price-changed.event';
import { MenuItemSlug } from '../value-objects/menu-item-slug.vo';
import { Sku } from '../value-objects/sku.vo';
import { Money } from '../value-objects/money.vo';

export interface MenuItemProps {
  id: string;
  restaurantId: string;
  itemType: MenuItemType;
  status: MenuItemStatus;
  sku: Sku;
  name: string;
  slug: MenuItemSlug | null;
  description: string | null;
  imageUrl: string | null;
  taxCategoryId: string | null;
  kitchenStationId: string | null;
  preparationTimeSeconds: number | null;
  caloriesKcal: number | null;
  prices: MenuPrice[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: Date | null;
  version: number;
}

export class MenuItem {
  private readonly domainEvents: DomainEvent[] = [];

  private constructor(private props: MenuItemProps) {}

  static reconstitute(props: MenuItemProps): MenuItem {
    return new MenuItem(props);
  }

  activate(actorId?: string | null): void {
    MenuItemInvariants.assertCanActivate(this, this.props.prices);

    this.props.status = MenuItemStatus.ACTIVE;
    this.touch(actorId);

    this.record(
      new MenuItemActivatedEvent({
        menuItemId: this.id,
        restaurantId: this.restaurantId,
        activatedAt: this.props.updatedAt.toISOString(),
      }),
    );
  }

  changeBasePrice(amount: Money, actorId?: string | null): MenuPrice {
    MenuItemInvariants.assertCanChangePrice(this);

    const currentBase = this.getBasePrice();

    if (!currentBase) {
      throw new DomainException('Base price not found', 'MENU_ITEM_BASE_PRICE_REQUIRED', 400);
    }

    const oldAmount = currentBase.amount;
    const superseded = currentBase.supersede(actorId);
    const updated = MenuPrice.createBase({
      menuItemId: this.id,
      amount,
      createdBy: actorId,
    });

    this.props.prices = this.props.prices.map((price) =>
      price.id === currentBase.id ? superseded : price,
    );
    this.props.prices.push(updated);
    this.touch(actorId);

    this.record(
      new MenuPriceChangedEvent({
        menuItemId: this.id,
        restaurantId: this.restaurantId,
        priceId: updated.id,
        oldAmountMinor: oldAmount.amountMinor.toString(),
        newAmountMinor: amount.amountMinor.toString(),
        currencyCode: amount.currencyCode,
      }),
    );

    return updated;
  }

  markOutOfStock(actorId?: string | null): void {
    MenuItemInvariants.assertCanMarkOutOfStock(this);
    this.props.status = MenuItemStatus.OUT_OF_STOCK;
    this.touch(actorId);
  }

  restock(actorId?: string | null): void {
    if (this.props.status !== MenuItemStatus.OUT_OF_STOCK) {
      throw new DomainException(
        'Only out-of-stock items can be restocked',
        'MENU_ITEM_INVALID_STATUS_TRANSITION',
        400,
        { currentStatus: this.props.status },
      );
    }
    this.props.status = MenuItemStatus.ACTIVE;
    this.touch(actorId);
  }

  hide(actorId?: string | null): void {
    if (this.props.status !== MenuItemStatus.ACTIVE) {
      throw new DomainException(
        'Only active items can be hidden',
        'MENU_ITEM_INVALID_STATUS_TRANSITION',
        400,
        { currentStatus: this.props.status },
      );
    }
    this.props.status = MenuItemStatus.HIDDEN;
    this.touch(actorId);
  }

  unhide(actorId?: string | null): void {
    if (this.props.status !== MenuItemStatus.HIDDEN) {
      throw new DomainException(
        'Only hidden items can be unhidden',
        'MENU_ITEM_INVALID_STATUS_TRANSITION',
        400,
        { currentStatus: this.props.status },
      );
    }
    this.props.status = MenuItemStatus.ACTIVE;
    this.touch(actorId);
  }

  archive(actorId?: string | null): void {
    MenuItemInvariants.assertCanArchive(this);
    this.props.status = MenuItemStatus.ARCHIVED;
    this.props.deletedAt = new Date();
    this.touch(actorId);
  }

  getBasePrice(): MenuPrice | null {
    return this.props.prices.find((price) => price.isBasePrice() && price.isActive()) ?? null;
  }

  pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    return events;
  }

  recordCreatedEvent(): void {
    this.record(
      new MenuItemCreatedEvent({
        menuItemId: this.id,
        restaurantId: this.restaurantId,
        sku: this.sku.value,
        name: this.name,
        slug: this.slug?.value ?? null,
        itemType: this.itemType,
        status: this.status,
      }),
    );
  }

  get id(): string {
    return this.props.id;
  }

  get restaurantId(): string {
    return this.props.restaurantId;
  }

  get itemType(): MenuItemType {
    return this.props.itemType;
  }

  get status(): MenuItemStatus {
    return this.props.status;
  }

  get sku(): Sku {
    return this.props.sku;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): MenuItemSlug | null {
    return this.props.slug;
  }

  get description(): string | null {
    return this.props.description;
  }

  get imageUrl(): string | null {
    return this.props.imageUrl;
  }

  get taxCategoryId(): string | null {
    return this.props.taxCategoryId;
  }

  get kitchenStationId(): string | null {
    return this.props.kitchenStationId;
  }

  get preparationTimeSeconds(): number | null {
    return this.props.preparationTimeSeconds;
  }

  get caloriesKcal(): number | null {
    return this.props.caloriesKcal;
  }

  get prices(): readonly MenuPrice[] {
    return this.props.prices;
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

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  toProps(): MenuItemProps {
    return {
      ...this.props,
      prices: [...this.props.prices],
    };
  }

  private touch(actorId?: string | null): void {
    this.props.updatedAt = new Date();
    this.props.updatedBy = actorId ?? this.props.updatedBy;
    this.props.version += 1;
  }

  private record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
}
