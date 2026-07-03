import { Module } from '@nestjs/common';
import { ArchiveCategoryUseCase } from './application/use-cases/archive-category.use-case';
import { ArchiveMenuItemUseCase } from './application/use-cases/archive-menu-item.use-case';
import { AttachMenuItemToCategoryUseCase } from './application/use-cases/attach-menu-item-to-category.use-case';
import { ChangeMenuItemPriceUseCase } from './application/use-cases/change-menu-item-price.use-case';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { CreateMenuItemUseCase } from './application/use-cases/create-menu-item.use-case';
import { GetCategoryUseCase } from './application/use-cases/get-category.use-case';
import { GetMenuItemUseCase } from './application/use-cases/get-menu-item.use-case';
import { ListCategoriesUseCase } from './application/use-cases/list-categories.use-case';
import { ListMenuItemsUseCase } from './application/use-cases/list-menu-items.use-case';
import {
  CATEGORY_PLACEMENT_REPOSITORY,
  MENU_CATEGORY_REPOSITORY,
  MENU_ITEM_REPOSITORY,
} from './application/ports/tokens';
import { PrismaUnitOfWork } from './infrastructure/persistence/context/prisma-unit-of-work';
import { PrismaCategoryPlacementRepository } from './infrastructure/persistence/repositories/prisma-category-placement.repository';
import { PrismaMenuCategoryRepository } from './infrastructure/persistence/repositories/prisma-menu-category.repository';
import { PrismaMenuItemRepository } from './infrastructure/persistence/repositories/prisma-menu-item.repository';
import { MenuCategoryController } from './presentation/controllers/menu-category.controller';
import { MenuItemController } from './presentation/controllers/menu-item.controller';

@Module({
  controllers: [MenuCategoryController, MenuItemController],
  providers: [
    PrismaUnitOfWork,
    {
      provide: MENU_CATEGORY_REPOSITORY,
      useClass: PrismaMenuCategoryRepository,
    },
    {
      provide: MENU_ITEM_REPOSITORY,
      useClass: PrismaMenuItemRepository,
    },
    {
      provide: CATEGORY_PLACEMENT_REPOSITORY,
      useClass: PrismaCategoryPlacementRepository,
    },
    CreateCategoryUseCase,
    CreateMenuItemUseCase,
    AttachMenuItemToCategoryUseCase,
    ChangeMenuItemPriceUseCase,
    ArchiveCategoryUseCase,
    ArchiveMenuItemUseCase,
    ListCategoriesUseCase,
    GetCategoryUseCase,
    ListMenuItemsUseCase,
    GetMenuItemUseCase,
  ],
  exports: [
    PrismaUnitOfWork,
    CreateCategoryUseCase,
    CreateMenuItemUseCase,
    AttachMenuItemToCategoryUseCase,
    ChangeMenuItemPriceUseCase,
    ArchiveCategoryUseCase,
    ArchiveMenuItemUseCase,
    ListCategoriesUseCase,
    GetCategoryUseCase,
    ListMenuItemsUseCase,
    GetMenuItemUseCase,
  ],
})
export class MenuModule {}
