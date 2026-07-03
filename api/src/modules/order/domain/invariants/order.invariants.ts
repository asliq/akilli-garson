import { DomainException } from '@/shared/exceptions/domain.exception';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderLine } from '../entities/order-line.entity';

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.DRAFT]: [OrderStatus.OPEN, OrderStatus.CANCELLED],
  [OrderStatus.OPEN]: [OrderStatus.IN_KITCHEN, OrderStatus.CANCELLED],
  [OrderStatus.IN_KITCHEN]: [
    OrderStatus.PARTIALLY_SERVED,
    OrderStatus.SERVED,
    OrderStatus.CANCELLED,
  ],
  [OrderStatus.PARTIALLY_SERVED]: [OrderStatus.SERVED, OrderStatus.CANCELLED],
  [OrderStatus.SERVED]: [OrderStatus.BILL_REQUESTED, OrderStatus.OPEN],
  [OrderStatus.BILL_REQUESTED]: [OrderStatus.PAYMENT_IN_PROGRESS],
  [OrderStatus.PAYMENT_IN_PROGRESS]: [OrderStatus.CLOSED, OrderStatus.OPEN],
  [OrderStatus.CLOSED]: [OrderStatus.VOIDED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.VOIDED]: [],
};

export class OrderInvariants {
  static assertHasLines(lines: OrderLine[]): void {
    if (lines.length === 0) {
      throw new DomainException('Order must contain at least one line', 'ORDER_LINES_REQUIRED', 400);
    }
  }

  static assertValidQuantity(quantity: number): void {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new DomainException(
        'Line quantity must be between 1 and 99',
        'INVALID_ORDER_LINE_QUANTITY',
        400,
        { quantity },
      );
    }
  }

  static assertCanTransition(from: OrderStatus, to: OrderStatus): void {
    const allowed = ALLOWED_TRANSITIONS[from];

    if (!allowed.includes(to)) {
      throw new DomainException(
        `Cannot transition order from '${from}' to '${to}'`,
        'ORDER_INVALID_STATUS_TRANSITION',
        400,
        { fromStatus: from, toStatus: to },
      );
    }
  }
}
