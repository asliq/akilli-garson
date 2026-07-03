import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface MenuItemArchivedPayload {
  menuItemId: string;
  restaurantId: string;
  archivedAt: string;
}

export class MenuItemArchivedEvent extends DomainEventBase {
  constructor(payload: MenuItemArchivedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'menu.item.archived';
  }
}
