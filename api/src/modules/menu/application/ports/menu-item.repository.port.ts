import { MenuItem } from '../../domain/entities/menu-item.entity';
import { MenuItemStatus } from '../../domain/enums/menu-item-status.enum';

export interface ListMenuItemsOptions {
  categoryId?: string;
  status?: MenuItemStatus;
}

export interface MenuItemRepositoryPort {
  findById(restaurantId: string, id: string): Promise<MenuItem | null>;
  findBySku(restaurantId: string, sku: string): Promise<MenuItem | null>;
  findMany(restaurantId: string, options?: ListMenuItemsOptions): Promise<MenuItem[]>;
  save(item: MenuItem): Promise<MenuItem>;
}
