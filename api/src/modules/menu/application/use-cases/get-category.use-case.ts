import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { GetCategoryQuery } from '../queries/get-category.query';
import { CreateCategoryResult } from '../results/create-category.result';
import { MenuCategoryRepositoryPort } from '../ports/menu-category.repository.port';
import { MENU_CATEGORY_REPOSITORY } from '../ports/tokens';

@Injectable()
export class GetCategoryUseCase {
  constructor(
    @Inject(MENU_CATEGORY_REPOSITORY)
    private readonly categoryRepository: MenuCategoryRepositoryPort,
  ) {}

  async execute(query: GetCategoryQuery): Promise<CreateCategoryResult> {
    const restaurantId = requireRestaurantId();

    const category = await this.categoryRepository.findById(restaurantId, query.categoryId);
    if (!category) {
      throw new NotFoundException('Category', query.categoryId);
    }

    return CreateCategoryResult.fromDomain(category);
  }
}
