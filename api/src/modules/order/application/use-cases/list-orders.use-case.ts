import { Inject, Injectable } from '@nestjs/common';
import { requireRestaurantId } from '@/modules/menu/application/helpers/require-restaurant-id.helper';
import { ListOrdersQuery } from '../queries/list-orders.query';
import { OrderResult } from '../results/order.result';
import { OrderRepositoryPort } from '../ports/order.repository.port';
import { ORDER_REPOSITORY } from '../ports/tokens';

@Injectable()
export class ListOrdersUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(query: ListOrdersQuery): Promise<OrderResult[]> {
    const restaurantId = requireRestaurantId();

    const orders = await this.orderRepository.findMany(restaurantId, {
      tableId: query.tableId,
      status: query.status,
    });

    return orders.map((order) => OrderResult.fromDomain(order));
  }
}
