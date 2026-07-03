import { OrderStatus } from '../../domain/enums/order-status.enum';

export class ListOrdersQuery {
  constructor(
    public readonly tableId?: string,
    public readonly status?: OrderStatus,
  ) {}
}
