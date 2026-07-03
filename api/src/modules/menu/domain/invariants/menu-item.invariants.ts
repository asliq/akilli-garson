import { DomainException } from '@/shared/exceptions/domain.exception';
import { MenuItemStatus } from '../enums/menu-item-status.enum';
import { MenuItem } from '../entities/menu-item.entity';
import { MenuPrice } from '../entities/menu-price.entity';

export class MenuItemInvariants {
  static assertCanActivate(item: MenuItem, prices: MenuPrice[]): void {
    if (item.status !== MenuItemStatus.DRAFT) {
      throw new DomainException(
        'Only draft menu items can be activated',
        'MENU_ITEM_INVALID_STATUS_TRANSITION',
        400,
        { currentStatus: item.status },
      );
    }

    if (!item.name.trim()) {
      throw new DomainException('Menu item name is required', 'MENU_ITEM_NAME_REQUIRED', 400);
    }

    if (!item.taxCategoryId) {
      throw new DomainException(
        'Tax category is required before activation',
        'MENU_ITEM_TAX_REQUIRED',
        400,
      );
    }

    MenuItemInvariants.assertHasActiveBasePrice(prices);
  }

  static assertHasActiveBasePrice(prices: MenuPrice[]): void {
    const basePrice = prices.find((price) => price.isBasePrice() && price.isActive());

    if (!basePrice) {
      throw new DomainException(
        'Active base price is required',
        'MENU_ITEM_BASE_PRICE_REQUIRED',
        400,
      );
    }
  }

  static assertCanChangePrice(item: MenuItem): void {
    if (item.status === MenuItemStatus.ARCHIVED) {
      throw new DomainException(
        'Archived menu items cannot change price',
        'MENU_ITEM_ARCHIVED',
        400,
      );
    }
  }

  static assertCanMarkOutOfStock(item: MenuItem): void {
    if (item.status !== MenuItemStatus.ACTIVE) {
      throw new DomainException(
        'Only active menu items can be marked out of stock',
        'MENU_ITEM_INVALID_STATUS_TRANSITION',
        400,
        { currentStatus: item.status },
      );
    }
  }

  static assertCanArchive(item: MenuItem): void {
    if (item.status === MenuItemStatus.ARCHIVED) {
      throw new DomainException('Menu item is already archived', 'MENU_ITEM_ALREADY_ARCHIVED', 400);
    }
  }

  static assertIsOrderable(item: MenuItem): void {
    if (item.status !== MenuItemStatus.ACTIVE && item.status !== MenuItemStatus.HIDDEN) {
      throw new DomainException(
        'Menu item is not orderable in its current status',
        'MENU_ITEM_NOT_ORDERABLE',
        400,
        { currentStatus: item.status },
      );
    }
  }

  static assertPreparationTime(seconds: number | null): void {
    if (seconds === null) {
      return;
    }

    if (!Number.isInteger(seconds) || seconds < 1 || seconds > 86400) {
      throw new DomainException(
        'Preparation time must be between 1 and 86400 seconds',
        'INVALID_PREPARATION_TIME',
        400,
        { preparationTimeSeconds: seconds },
      );
    }
  }

  static assertCalories(calories: number | null): void {
    if (calories === null) {
      return;
    }

    if (!Number.isInteger(calories) || calories < 0) {
      throw new DomainException(
        'Calories must be a non-negative integer',
        'INVALID_CALORIES',
        400,
        { caloriesKcal: calories },
      );
    }
  }
}
