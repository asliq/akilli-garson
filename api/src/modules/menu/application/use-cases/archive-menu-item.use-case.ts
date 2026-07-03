import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { ArchiveMenuItemCommand } from '../commands/archive-menu-item.command';
import { ArchiveMenuItemResult } from '../results/archive-menu-item.result';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '../helpers/publish-domain-events.helper';
import { MenuItemRepositoryPort } from '../ports/menu-item.repository.port';
import { MENU_ITEM_REPOSITORY } from '../ports/tokens';
import { MenuItemArchivedEvent } from '../../domain/events/menu-item-archived.event';

@Injectable()
export class ArchiveMenuItemUseCase {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY)
    private readonly menuItemRepository: MenuItemRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: ArchiveMenuItemCommand, actorId?: string): Promise<ArchiveMenuItemResult> {
    const restaurantId = requireRestaurantId();

    const item = await this.menuItemRepository.findById(restaurantId, command.menuItemId);
    if (!item) {
      throw new NotFoundException('MenuItem', command.menuItemId);
    }

    item.archive(actorId);

    const saved = await this.menuItemRepository.save(item);

    publishDomainEvents(this.eventPublisher, [
      new MenuItemArchivedEvent({
        menuItemId: saved.id,
        restaurantId: saved.restaurantId,
        archivedAt: saved.deletedAt?.toISOString() ?? saved.updatedAt.toISOString(),
      }),
    ]);

    return ArchiveMenuItemResult.fromDomain(saved);
  }
}
