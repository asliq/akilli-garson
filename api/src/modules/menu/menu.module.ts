import { Module } from '@nestjs/common';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';

/**
 * MenuModule — Repository binding infrastructure katmanında yapılacak.
 * MENU_CATEGORY_REPOSITORY provider eklenmeden use case runtime'da inject edilemez.
 */
@Module({
  providers: [CreateCategoryUseCase],
  exports: [CreateCategoryUseCase],
})
export class MenuModule {}
