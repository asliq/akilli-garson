import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { ChangeMenuItemPriceCommand } from '../commands/change-menu-item-price.command';
import { ChangeMenuItemPriceResult } from '../results/change-menu-item-price.result';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '../helpers/publish-domain-events.helper';
import { MenuItemRepositoryPort } from '../ports/menu-item.repository.port';
import { MENU_ITEM_REPOSITORY } from '../ports/tokens';
import { Money } from '../../domain/value-objects/money.vo';

@Injectable()
export class ChangeMenuItemPriceUseCase {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY)
    private readonly menuItemRepository: MenuItemRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(
    command: ChangeMenuItemPriceCommand,
    actorId?: string,
  ): Promise<ChangeMenuItemPriceResult> {
    const restaurantId = requireRestaurantId();

    const item = await this.menuItemRepository.findById(restaurantId, command.menuItemId);
    if (!item) {
      throw new NotFoundException('MenuItem', command.menuItemId);
    }

    const newPrice = item.changeBasePrice(
      Money.create(command.amountMinor, command.currencyCode),
      actorId,
    );

    const saved = await this.menuItemRepository.save(item);

    publishDomainEvents(this.eventPublisher, saved.pullDomainEvents());

    return ChangeMenuItemPriceResult.fromDomain(saved, newPrice.id);
  }
}
