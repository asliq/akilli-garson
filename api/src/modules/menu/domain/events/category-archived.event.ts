import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface CategoryArchivedPayload {
  categoryId: string;
  restaurantId: string;
  archivedAt: string;
}

export class CategoryArchivedEvent extends DomainEventBase {
  constructor(payload: CategoryArchivedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'menu.category.archived';
  }
}
