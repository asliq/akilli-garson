import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { ConflictException } from '@/shared/exceptions/conflict.exception';
import { CreateMenuItemCommand } from '../commands/create-menu-item.command';
import { CreateMenuItemResult } from '../results/create-menu-item.result';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '../helpers/publish-domain-events.helper';
import { MenuItemRepositoryPort } from '../ports/menu-item.repository.port';
import { MENU_ITEM_REPOSITORY } from '../ports/tokens';
import { MenuItemFactory } from '../../domain/factories/menu-item.factory';
import { Money } from '../../domain/value-objects/money.vo';

import { Sku } from '../../domain/value-objects/sku.vo';

@Injectable()
export class CreateMenuItemUseCase {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY)
    private readonly menuItemRepository: MenuItemRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: CreateMenuItemCommand, actorId?: string): Promise<CreateMenuItemResult> {
    const restaurantId = requireRestaurantId();

    const normalizedSku = Sku.create(command.sku).value;
    await this.ensureSkuIsUnique(restaurantId, normalizedSku);

    const item = MenuItemFactory.createDraft({
      restaurantId,
      name: command.name,
      sku: command.sku,
      basePrice: Money.create(command.amountMinor, command.currencyCode),
      slug: command.slug,
      description: command.description,
      imageUrl: command.imageUrl,
      itemType: command.itemType,
      taxCategoryId: command.taxCategoryId,
      kitchenStationId: command.kitchenStationId,
      preparationTimeSeconds: command.preparationTimeSeconds,
      caloriesKcal: command.caloriesKcal,
      createdBy: actorId,
    });

    const saved = await this.menuItemRepository.save(item);

    publishDomainEvents(this.eventPublisher, saved.pullDomainEvents());

    return CreateMenuItemResult.fromDomain(saved);
  }

  private async ensureSkuIsUnique(restaurantId: string, sku: string): Promise<void> {
    const existing = await this.menuItemRepository.findBySku(restaurantId, sku.toUpperCase());
    if (existing) {
      throw new ConflictException(`Menu item SKU '${sku}' already exists`, {
        restaurantId,
        sku,
      });
    }
  }
}
