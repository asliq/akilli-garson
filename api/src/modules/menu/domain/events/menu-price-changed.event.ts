import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface MenuPriceChangedPayload {
  menuItemId: string;
  restaurantId: string;
  priceId: string;
  oldAmountMinor: string;
  newAmountMinor: string;
  currencyCode: string;
}

export class MenuPriceChangedEvent extends DomainEventBase {
  constructor(payload: MenuPriceChangedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'menu.price.changed';
  }
}
