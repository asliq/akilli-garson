import {
  MenuCategoryStatus as PrismaMenuCategoryStatus,
  MenuItemStatus as PrismaMenuItemStatus,
  MenuItemType as PrismaMenuItemType,
  MenuPriceStatus as PrismaMenuPriceStatus,
} from '@prisma/client';
import { MenuCategoryStatus } from '../../../domain/enums/menu-category-status.enum';
import { MenuItemStatus } from '../../../domain/enums/menu-item-status.enum';
import { MenuItemType } from '../../../domain/enums/menu-item-type.enum';
import { MenuPriceStatus } from '../../../domain/enums/menu-price-status.enum';

const CATEGORY_STATUS_TO_DOMAIN: Record<PrismaMenuCategoryStatus, MenuCategoryStatus> = {
  [PrismaMenuCategoryStatus.ACTIVE]: MenuCategoryStatus.ACTIVE,
  [PrismaMenuCategoryStatus.HIDDEN]: MenuCategoryStatus.HIDDEN,
  [PrismaMenuCategoryStatus.ARCHIVED]: MenuCategoryStatus.ARCHIVED,
};

const CATEGORY_STATUS_TO_PERSISTENCE: Record<MenuCategoryStatus, PrismaMenuCategoryStatus> = {
  [MenuCategoryStatus.ACTIVE]: PrismaMenuCategoryStatus.ACTIVE,
  [MenuCategoryStatus.HIDDEN]: PrismaMenuCategoryStatus.HIDDEN,
  [MenuCategoryStatus.ARCHIVED]: PrismaMenuCategoryStatus.ARCHIVED,
};

const ITEM_STATUS_TO_DOMAIN: Record<PrismaMenuItemStatus, MenuItemStatus> = {
  [PrismaMenuItemStatus.DRAFT]: MenuItemStatus.DRAFT,
  [PrismaMenuItemStatus.ACTIVE]: MenuItemStatus.ACTIVE,
  [PrismaMenuItemStatus.OUT_OF_STOCK]: MenuItemStatus.OUT_OF_STOCK,
  [PrismaMenuItemStatus.HIDDEN]: MenuItemStatus.HIDDEN,
  [PrismaMenuItemStatus.ARCHIVED]: MenuItemStatus.ARCHIVED,
};

const ITEM_STATUS_TO_PERSISTENCE: Record<MenuItemStatus, PrismaMenuItemStatus> = {
  [MenuItemStatus.DRAFT]: PrismaMenuItemStatus.DRAFT,
  [MenuItemStatus.ACTIVE]: PrismaMenuItemStatus.ACTIVE,
  [MenuItemStatus.OUT_OF_STOCK]: PrismaMenuItemStatus.OUT_OF_STOCK,
  [MenuItemStatus.HIDDEN]: PrismaMenuItemStatus.HIDDEN,
  [MenuItemStatus.ARCHIVED]: PrismaMenuItemStatus.ARCHIVED,
};

const ITEM_TYPE_TO_DOMAIN: Record<PrismaMenuItemType, MenuItemType> = {
  [PrismaMenuItemType.SIMPLE]: MenuItemType.SIMPLE,
  [PrismaMenuItemType.COMBO]: MenuItemType.COMBO,
};

const ITEM_TYPE_TO_PERSISTENCE: Record<MenuItemType, PrismaMenuItemType> = {
  [MenuItemType.SIMPLE]: PrismaMenuItemType.SIMPLE,
  [MenuItemType.COMBO]: PrismaMenuItemType.COMBO,
};

const PRICE_STATUS_TO_DOMAIN: Record<PrismaMenuPriceStatus, MenuPriceStatus> = {
  [PrismaMenuPriceStatus.SCHEDULED]: MenuPriceStatus.SCHEDULED,
  [PrismaMenuPriceStatus.ACTIVE]: MenuPriceStatus.ACTIVE,
  [PrismaMenuPriceStatus.EXPIRED]: MenuPriceStatus.EXPIRED,
  [PrismaMenuPriceStatus.SUPERSEDED]: MenuPriceStatus.SUPERSEDED,
};

const PRICE_STATUS_TO_PERSISTENCE: Record<MenuPriceStatus, PrismaMenuPriceStatus> = {
  [MenuPriceStatus.SCHEDULED]: PrismaMenuPriceStatus.SCHEDULED,
  [MenuPriceStatus.ACTIVE]: PrismaMenuPriceStatus.ACTIVE,
  [MenuPriceStatus.EXPIRED]: PrismaMenuPriceStatus.EXPIRED,
  [MenuPriceStatus.SUPERSEDED]: PrismaMenuPriceStatus.SUPERSEDED,
};

export class MenuEnumMapper {
  static toDomainCategoryStatus(status: PrismaMenuCategoryStatus): MenuCategoryStatus {
    return CATEGORY_STATUS_TO_DOMAIN[status];
  }

  static toPersistenceCategoryStatus(status: MenuCategoryStatus): PrismaMenuCategoryStatus {
    return CATEGORY_STATUS_TO_PERSISTENCE[status];
  }

  static toDomainItemStatus(status: PrismaMenuItemStatus): MenuItemStatus {
    return ITEM_STATUS_TO_DOMAIN[status];
  }

  static toPersistenceItemStatus(status: MenuItemStatus): PrismaMenuItemStatus {
    return ITEM_STATUS_TO_PERSISTENCE[status];
  }

  static toDomainItemType(type: PrismaMenuItemType): MenuItemType {
    return ITEM_TYPE_TO_DOMAIN[type];
  }

  static toPersistenceItemType(type: MenuItemType): PrismaMenuItemType {
    return ITEM_TYPE_TO_PERSISTENCE[type];
  }

  static toDomainPriceStatus(status: PrismaMenuPriceStatus): MenuPriceStatus {
    return PRICE_STATUS_TO_DOMAIN[status];
  }

  static toPersistencePriceStatus(status: MenuPriceStatus): PrismaMenuPriceStatus {
    return PRICE_STATUS_TO_PERSISTENCE[status];
  }
}
