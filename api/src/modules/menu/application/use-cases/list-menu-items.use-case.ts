import { Inject, Injectable } from '@nestjs/common';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { ListMenuItemsQuery } from '../queries/list-menu-items.query';
import { CreateMenuItemResult } from '../results/create-menu-item.result';
import { MenuItemRepositoryPort } from '../ports/menu-item.repository.port';
import { MENU_ITEM_REPOSITORY } from '../ports/tokens';

@Injectable()
export class ListMenuItemsUseCase {
  constructor(
    @Inject(MENU_ITEM_REPOSITORY)
    private readonly menuItemRepository: MenuItemRepositoryPort,
  ) {}

  async execute(query: ListMenuItemsQuery): Promise<CreateMenuItemResult[]> {
    const restaurantId = requireRestaurantId();

    const items = await this.menuItemRepository.findMany(restaurantId, {
      categoryId: query.categoryId,
      status: query.status,
    });

    return items.map((item) => CreateMenuItemResult.fromDomain(item));
  }
}
