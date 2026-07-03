import { Order } from '../../domain/entities/order.entity';
import { OrderStatus } from '../../domain/enums/order-status.enum';

export interface ListOrdersOptions {
  tableId?: string;
  status?: OrderStatus;
}

export interface OrderRepositoryPort {
  findById(restaurantId: string, id: string): Promise<Order | null>;
  findMany(restaurantId: string, options?: ListOrdersOptions): Promise<Order[]>;
  save(order: Order): Promise<Order>;
}
