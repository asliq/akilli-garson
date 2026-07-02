import { MenuCategory } from '../entities/menu-category.entity';

export const MENU_CATEGORY_REPOSITORY = Symbol('MENU_CATEGORY_REPOSITORY');

export interface IMenuCategoryRepository {
  findBySlug(restaurantId: string, slug: string): Promise<MenuCategory | null>;

  findByNameAndBranch(
    restaurantId: string,
    branchId: string,
    name: string,
  ): Promise<MenuCategory | null>;

  getMaxDisplayOrder(restaurantId: string, branchId: string | null): Promise<number>;

  save(category: MenuCategory): Promise<MenuCategory>;
}
