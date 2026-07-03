import { OrderStatus } from '../../domain/enums/order-status.enum';

export class ChangeOrderStatusCommand {
  constructor(
    public readonly orderId: string,
    public readonly status: OrderStatus,
  ) {}
}
