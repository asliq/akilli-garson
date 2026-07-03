import { CategoryPlacement } from '../../domain/entities/category-placement.entity';

export interface CategoryPlacementRepositoryPort {
  findByMenuItemId(restaurantId: string, menuItemId: string): Promise<CategoryPlacement[]>;
  findByCategoryAndItem(
    restaurantId: string,
    categoryId: string,
    menuItemId: string,
  ): Promise<CategoryPlacement | null>;
  save(placement: CategoryPlacement): Promise<CategoryPlacement>;
  saveMany(placements: CategoryPlacement[]): Promise<CategoryPlacement[]>;
}
