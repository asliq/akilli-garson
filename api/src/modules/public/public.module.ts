import { Module } from '@nestjs/common';
import { PUBLIC_MENU_REPOSITORY } from './application/ports/tokens';
import { GetPublicMenuUseCase } from './application/use-cases/get-public-menu.use-case';
import { PrismaPublicMenuRepository } from './infrastructure/persistence/repositories/prisma-public-menu.repository';
import { PublicMenuController } from './presentation/controllers/public-menu.controller';

@Module({
  controllers: [PublicMenuController],
  providers: [
    {
      provide: PUBLIC_MENU_REPOSITORY,
      useClass: PrismaPublicMenuRepository,
    },
    GetPublicMenuUseCase,
  ],
  exports: [GetPublicMenuUseCase],
})
export class PublicModule {}
