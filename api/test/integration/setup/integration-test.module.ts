import { Test, TestingModule } from '@nestjs/testing';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { PrismaModule } from '@/core/database/prisma.module';
import { PrismaService } from '@/core/database/prisma.service';
import { MenuModule } from '@/modules/menu/menu.module';
import { CreateCategoryUseCase } from '@/modules/menu/application/use-cases/create-category.use-case';
import { ArchiveCategoryUseCase } from '@/modules/menu/application/use-cases/archive-category.use-case';
import { MENU_CATEGORY_REPOSITORY } from '@/modules/menu/application/ports/tokens';
import { MenuCategoryRepositoryPort } from '@/modules/menu/application/ports/menu-category.repository.port';
import { PrismaUnitOfWork } from '@/modules/menu/infrastructure/persistence/context/prisma-unit-of-work';
import { FakeEventPublisher } from './fake-event.publisher';

export interface IntegrationTestContext {
  module: TestingModule;
  prisma: PrismaService;
  createCategoryUseCase: CreateCategoryUseCase;
  archiveCategoryUseCase: ArchiveCategoryUseCase;
  categoryRepository: MenuCategoryRepositoryPort;
  unitOfWork: PrismaUnitOfWork;
  fakeEventPublisher: FakeEventPublisher;
}

export async function createIntegrationTestModule(): Promise<IntegrationTestContext> {
  const fakeEventPublisher = new FakeEventPublisher();

  const module = await Test.createTestingModule({
    imports: [PrismaModule, MenuModule],
  })
    .overrideProvider(DomainEventPublisher)
    .useValue(fakeEventPublisher)
    .compile();

  await module.init();

  const prisma = module.get(PrismaService);

  return {
    module,
    prisma,
    createCategoryUseCase: module.get(CreateCategoryUseCase),
    archiveCategoryUseCase: module.get(ArchiveCategoryUseCase),
    categoryRepository: module.get(MENU_CATEGORY_REPOSITORY),
    unitOfWork: module.get(PrismaUnitOfWork),
    fakeEventPublisher,
  };
}

export async function destroyIntegrationTestModule(module?: TestingModule): Promise<void> {
  if (!module) {
    return;
  }

  const prisma = module.get(PrismaService);
  await prisma.$disconnect();
  await module.close();
}
