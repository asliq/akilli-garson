import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface OrderCreatedPayload {
  orderId: string;
  restaurantId: string;
  tableId: string;
  status: string;
  lineCount: number;
  totalMinor: string;
  currencyCode: string;
}

export class OrderCreatedEvent extends DomainEventBase {
  constructor(payload: OrderCreatedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'order.created';
  }
}
