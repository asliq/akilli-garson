import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface MenuItemActivatedPayload {
  menuItemId: string;
  restaurantId: string;
  activatedAt: string;
}

export class MenuItemActivatedEvent extends DomainEventBase {
  constructor(payload: MenuItemActivatedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'menu.item.activated';
  }
}
