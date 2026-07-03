import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { requireRestaurantId } from '@/modules/menu/application/helpers/require-restaurant-id.helper';
import { GetOrderQuery } from '../queries/get-order.query';
import { OrderResult } from '../results/order.result';
import { OrderRepositoryPort } from '../ports/order.repository.port';
import { ORDER_REPOSITORY } from '../ports/tokens';

@Injectable()
export class GetOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(query: GetOrderQuery): Promise<OrderResult> {
    const restaurantId = requireRestaurantId();

    const order = await this.orderRepository.findById(restaurantId, query.orderId);
    if (!order) {
      throw new NotFoundException('Order', query.orderId);
    }

    return OrderResult.fromDomain(order);
  }
}
