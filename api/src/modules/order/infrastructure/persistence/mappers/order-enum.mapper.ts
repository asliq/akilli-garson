import { OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { OrderStatus } from '../../../domain/enums/order-status.enum';

const TO_DOMAIN: Record<PrismaOrderStatus, OrderStatus> = {
  [PrismaOrderStatus.DRAFT]: OrderStatus.DRAFT,
  [PrismaOrderStatus.OPEN]: OrderStatus.OPEN,
  [PrismaOrderStatus.IN_KITCHEN]: OrderStatus.IN_KITCHEN,
  [PrismaOrderStatus.PARTIALLY_SERVED]: OrderStatus.PARTIALLY_SERVED,
  [PrismaOrderStatus.SERVED]: OrderStatus.SERVED,
  [PrismaOrderStatus.BILL_REQUESTED]: OrderStatus.BILL_REQUESTED,
  [PrismaOrderStatus.PAYMENT_IN_PROGRESS]: OrderStatus.PAYMENT_IN_PROGRESS,
  [PrismaOrderStatus.CLOSED]: OrderStatus.CLOSED,
  [PrismaOrderStatus.CANCELLED]: OrderStatus.CANCELLED,
  [PrismaOrderStatus.VOIDED]: OrderStatus.VOIDED,
};

const TO_PERSISTENCE: Record<OrderStatus, PrismaOrderStatus> = {
  [OrderStatus.DRAFT]: PrismaOrderStatus.DRAFT,
  [OrderStatus.OPEN]: PrismaOrderStatus.OPEN,
  [OrderStatus.IN_KITCHEN]: PrismaOrderStatus.IN_KITCHEN,
  [OrderStatus.PARTIALLY_SERVED]: PrismaOrderStatus.PARTIALLY_SERVED,
  [OrderStatus.SERVED]: PrismaOrderStatus.SERVED,
  [OrderStatus.BILL_REQUESTED]: PrismaOrderStatus.BILL_REQUESTED,
  [OrderStatus.PAYMENT_IN_PROGRESS]: PrismaOrderStatus.PAYMENT_IN_PROGRESS,
  [OrderStatus.CLOSED]: PrismaOrderStatus.CLOSED,
  [OrderStatus.CANCELLED]: PrismaOrderStatus.CANCELLED,
  [OrderStatus.VOIDED]: PrismaOrderStatus.VOIDED,
};

export class OrderEnumMapper {
  static toDomain(status: PrismaOrderStatus): OrderStatus {
    return TO_DOMAIN[status];
  }

  static toPersistence(status: OrderStatus): PrismaOrderStatus {
    return TO_PERSISTENCE[status];
  }
}
