import { MenuCategory } from '../../domain/entities/menu-category.entity';

export interface ListMenuCategoriesOptions {
  branchId?: string | null;
}

export interface MenuCategoryRepositoryPort {
  findById(restaurantId: string, id: string): Promise<MenuCategory | null>;
  findMany(restaurantId: string, options?: ListMenuCategoriesOptions): Promise<MenuCategory[]>;
  findBySlug(restaurantId: string, slug: string): Promise<MenuCategory | null>;
  findByNameAndBranch(
    restaurantId: string,
    branchId: string,
    name: string,
  ): Promise<MenuCategory | null>;
  getMaxDisplayOrder(restaurantId: string, branchId: string | null): Promise<number>;
  save(category: MenuCategory): Promise<MenuCategory>;
}
