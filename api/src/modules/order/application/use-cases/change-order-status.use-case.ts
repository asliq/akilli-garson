import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { requireRestaurantId } from '@/modules/menu/application/helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '@/modules/menu/application/helpers/publish-domain-events.helper';
import { ChangeOrderStatusCommand } from '../commands/change-order-status.command';
import { OrderResult } from '../results/order.result';
import { OrderRepositoryPort } from '../ports/order.repository.port';
import { ORDER_REPOSITORY } from '../ports/tokens';

@Injectable()
export class ChangeOrderStatusUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: ChangeOrderStatusCommand): Promise<OrderResult> {
    const restaurantId = requireRestaurantId();

    const order = await this.orderRepository.findById(restaurantId, command.orderId);
    if (!order) {
      throw new NotFoundException('Order', command.orderId);
    }

    order.changeStatus(command.status);

    const saved = await this.orderRepository.save(order);
    publishDomainEvents(this.eventPublisher, saved.pullDomainEvents());

    return OrderResult.fromDomain(saved);
  }
}
