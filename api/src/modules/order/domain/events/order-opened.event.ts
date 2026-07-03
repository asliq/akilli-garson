import { DomainEventBase } from '@/core/events/domain-event.interface';

export interface OrderOpenedPayload {
  orderId: string;
  restaurantId: string;
  tableId: string;
  lineCount: number;
  totalMinor: string;
  currencyCode: string;
}

export class OrderOpenedEvent extends DomainEventBase {
  constructor(payload: OrderOpenedPayload) {
    super(payload as unknown as Record<string, unknown>);
  }

  get eventName(): string {
    return 'order.opened';
  }
}
