import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { ArchiveCategoryCommand } from '../commands/archive-category.command';
import { ArchiveCategoryResult } from '../results/archive-category.result';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '../helpers/publish-domain-events.helper';
import { MenuCategoryRepositoryPort } from '../ports/menu-category.repository.port';
import { MENU_CATEGORY_REPOSITORY } from '../ports/tokens';
import { CategoryArchivedEvent } from '../../domain/events/category-archived.event';

@Injectable()
export class ArchiveCategoryUseCase {
  constructor(
    @Inject(MENU_CATEGORY_REPOSITORY)
    private readonly categoryRepository: MenuCategoryRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: ArchiveCategoryCommand, actorId?: string): Promise<ArchiveCategoryResult> {
    const restaurantId = requireRestaurantId();

    const category = await this.categoryRepository.findById(restaurantId, command.categoryId);
    if (!category) {
      throw new NotFoundException('Category', command.categoryId);
    }

    category.archive(actorId);

    const saved = await this.categoryRepository.save(category);

    publishDomainEvents(this.eventPublisher, [
      new CategoryArchivedEvent({
        categoryId: saved.id,
        restaurantId: saved.restaurantId,
        archivedAt: saved.deletedAt?.toISOString() ?? saved.updatedAt.toISOString(),
      }),
    ]);

    return ArchiveCategoryResult.fromDomain(saved);
  }
}
