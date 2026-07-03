import { Inject, Injectable } from '@nestjs/common';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { ListCategoriesQuery } from '../queries/list-categories.query';
import { CreateCategoryResult } from '../results/create-category.result';
import { MenuCategoryRepositoryPort } from '../ports/menu-category.repository.port';
import { MENU_CATEGORY_REPOSITORY } from '../ports/tokens';

@Injectable()
export class ListCategoriesUseCase {
  constructor(
    @Inject(MENU_CATEGORY_REPOSITORY)
    private readonly categoryRepository: MenuCategoryRepositoryPort,
  ) {}

  async execute(query: ListCategoriesQuery): Promise<CreateCategoryResult[]> {
    const restaurantId = requireRestaurantId();

    const categories = await this.categoryRepository.findMany(restaurantId, {
      branchId: query.branchId,
    });

    return categories.map((category) => CreateCategoryResult.fromDomain(category));
  }
}
