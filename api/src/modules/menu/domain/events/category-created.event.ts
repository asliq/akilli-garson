import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface CategoryCreatedPayload {
  categoryId: string;
  restaurantId: string;
  branchId: string | null;
  name: string;
  slug: string;
  displayOrder: number;
  status: string;
}

export class CategoryCreatedEvent extends DomainEventBase {
  constructor(payload: CategoryCreatedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'menu.category.created';
  }
}
