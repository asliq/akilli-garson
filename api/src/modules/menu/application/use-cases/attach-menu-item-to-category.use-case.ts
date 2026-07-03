import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { AttachMenuItemToCategoryCommand } from '../commands/attach-menu-item-to-category.command';
import { AttachMenuItemToCategoryResult } from '../results/attach-menu-item-to-category.result';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '../helpers/publish-domain-events.helper';
import { CategoryPlacementRepositoryPort } from '../ports/category-placement.repository.port';
import { MenuCategoryRepositoryPort } from '../ports/menu-category.repository.port';
import { MenuItemRepositoryPort } from '../ports/menu-item.repository.port';
import {
  CATEGORY_PLACEMENT_REPOSITORY,
  MENU_CATEGORY_REPOSITORY,
  MENU_ITEM_REPOSITORY,
} from '../ports/tokens';
import { CategoryPlacementFactory } from '../../domain/factories/category-placement.factory';
import { CategoryPlacement } from '../../domain/entities/category-placement.entity';
import { PrimaryCategoryChangedEvent } from '../../domain/events/primary-category-changed.event';

@Injectable()
export class AttachMenuItemToCategoryUseCase {
  constructor(
    @Inject(MENU_CATEGORY_REPOSITORY)
    private readonly categoryRepository: MenuCategoryRepositoryPort,
    @Inject(MENU_ITEM_REPOSITORY)
    private readonly menuItemRepository: MenuItemRepositoryPort,
    @Inject(CATEGORY_PLACEMENT_REPOSITORY)
    private readonly placementRepository: CategoryPlacementRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(
    command: AttachMenuItemToCategoryCommand,
    actorId?: string,
  ): Promise<AttachMenuItemToCategoryResult> {
    const restaurantId = requireRestaurantId();

    const category = await this.categoryRepository.findById(restaurantId, command.categoryId);
    if (!category) {
      throw new NotFoundException('Category', command.categoryId);
    }

    const menuItem = await this.menuItemRepository.findById(restaurantId, command.menuItemId);
    if (!menuItem) {
      throw new NotFoundException('MenuItem', command.menuItemId);
    }

    const existingPlacements = await this.placementRepository.findByMenuItemId(
      restaurantId,
      command.menuItemId,
    );

    const toSave: CategoryPlacement[] = [];
    let previousPrimaryCategoryId: string | null = null;
    const willBePrimary = command.isPrimary ?? existingPlacements.length === 0;

    const currentPrimary = existingPlacements.find((p) => p.isPrimary);
    if (willBePrimary && currentPrimary && currentPrimary.categoryId !== command.categoryId) {
      previousPrimaryCategoryId = currentPrimary.categoryId;
      currentPrimary.unmarkPrimary(actorId);
      toSave.push(currentPrimary);
    }

    const placement = CategoryPlacementFactory.create({
      restaurantId,
      categoryId: command.categoryId,
      menuItemId: command.menuItemId,
      categoryStatus: category.status,
      categoryRestaurantId: category.restaurantId,
      menuItemRestaurantId: menuItem.restaurantId,
      displayOrder: command.displayOrder,
      isPrimary: willBePrimary,
      existingPlacements,
      createdBy: actorId,
    });

    toSave.push(placement);
    await this.placementRepository.saveMany(toSave);

    const events = placement
      .pullDomainEvents()
      .filter((event) => event.eventName !== 'menu.category-placement.primary-changed');

    if (willBePrimary) {
      events.push(
        new PrimaryCategoryChangedEvent({
          menuItemId: placement.menuItemId,
          restaurantId: placement.restaurantId,
          newPrimaryCategoryId: placement.categoryId,
          previousPrimaryCategoryId,
          placementId: placement.id,
        }),
      );
    }

    publishDomainEvents(this.eventPublisher, events);

    return AttachMenuItemToCategoryResult.fromDomain(placement);
  }
}
