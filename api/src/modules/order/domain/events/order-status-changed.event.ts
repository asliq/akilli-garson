import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface OrderStatusChangedPayload {
  orderId: string;
  restaurantId: string;
  tableId: string;
  previousStatus: string;
  newStatus: string;
}

export class OrderStatusChangedEvent extends DomainEventBase {
  constructor(payload: OrderStatusChangedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'order.status-changed';
  }
}
