import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { GetMenuItemQuery } from '../queries/get-menu-item.query';
import { CreateMenuItemResult } from '../results/create-menu-item.result';
import { MenuItemRepositoryPort } from '../ports/menu-item.repository.port';
import { MENU_ITEM_REPOSITORY } from '../ports/tokens';

@Injectable()
export class GetMenuItemUseCase {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY)
    private readonly menuItemRepository: MenuItemRepositoryPort,
  ) {}

  async execute(query: GetMenuItemQuery): Promise<CreateMenuItemResult> {
    const restaurantId = requireRestaurantId();

    const item = await this.menuItemRepository.findById(restaurantId, query.menuItemId);
    if (!item) {
      throw new NotFoundException('MenuItem', query.menuItemId);
    }

    return CreateMenuItemResult.fromDomain(item);
  }
}
