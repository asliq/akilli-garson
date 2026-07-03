import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface MenuItemCreatedPayload {
  menuItemId: string;
  restaurantId: string;
  sku: string;
  name: string;
  slug: string | null;
  itemType: string;
  status: string;
}

export class MenuItemCreatedEvent extends DomainEventBase {
  constructor(payload: MenuItemCreatedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'menu.item.created';
  }
}
