import { randomUUID } from 'crypto';
import { TestingModule } from '@nestjs/testing';
import { ConflictException } from '@/shared/exceptions/conflict.exception';
import { DomainException } from '@/shared/exceptions/domain.exception';
import { CreateCategoryCommand } from '@/modules/menu/application/commands/create-category.command';
import { ArchiveCategoryCommand } from '@/modules/menu/application/commands/archive-category.command';
import { MenuCategory } from '@/modules/menu/domain/entities/menu-category.entity';
import { MenuCategoryStatus } from '@/modules/menu/domain/enums/menu-category-status.enum';
import {
  createIntegrationTestModule,
  destroyIntegrationTestModule,
  IntegrationTestContext,
} from './setup/integration-test.module';
import {
  resetIntegrationDatabase,
  seedRestaurant,
  startIntegrationDatabase,
  stopIntegrationDatabase,
} from './setup/database.setup';
import { runWithTenant, runWithoutTenant } from './setup/tenant.helper';

describe('CreateCategoryUseCase (integration)', () => {
  let ctx: IntegrationTestContext;
  let module: TestingModule | undefined;

  beforeAll(async () => {
    await startIntegrationDatabase();
    ctx = await createIntegrationTestModule();
    module = ctx.module;
  }, 180_000);

  afterAll(async () => {
    await destroyIntegrationTestModule(module);
    await stopIntegrationDatabase();
  }, 60_000);

  beforeEach(async () => {
    ctx.fakeEventPublisher.clear();
    await resetIntegrationDatabase(ctx.prisma);
  });

  it('1 — kategori başarıyla oluşturulur', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);

    const result = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(
        new CreateCategoryCommand('Ana Yemekler', 'ana-yemekler', 'Lezzetli yemekler'),
      ),
    );

    expect(result.id).toBeDefined();
    expect(result.restaurantId).toBe(restaurant.id);
    expect(result.name).toBe('Ana Yemekler');
    expect(result.slug).toBe('ana-yemekler');
    expect(result.status).toBe(MenuCategoryStatus.ACTIVE);
    expect(result.version).toBe(1);

    const persisted = await ctx.prisma.menuCategory.findFirst({
      where: { id: result.id, restaurantId: restaurant.id },
    });

    expect(persisted).not.toBeNull();
    expect(persisted?.deletedAt).toBeNull();
    expect(persisted?.slug).toBe('ana-yemekler');
  });

  it('2 — aynı slug ikinci kez oluşturulamaz', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);

    await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('İçecekler', 'icecekler')),
    );

    await expect(
      runWithTenant(restaurant.id, () =>
        ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Diğer İçecekler', 'icecekler')),
      ),
    ).rejects.toMatchObject({
      name: 'ConflictException',
      code: 'CONFLICT',
    });
  });

  it('3 — restaurant scope korunur (aynı slug farklı tenantlarda kullanılabilir)', async () => {
    const restaurantA = await seedRestaurant(ctx.prisma, { name: 'Restaurant A' });
    const restaurantB = await seedRestaurant(ctx.prisma, { name: 'Restaurant B' });

    const resultA = await runWithTenant(restaurantA.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Tatlılar', 'tatlilar')),
    );

    const resultB = await runWithTenant(restaurantB.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Tatlılar', 'tatlilar')),
    );

    expect(resultA.slug).toBe('tatlilar');
    expect(resultB.slug).toBe('tatlilar');
    expect(resultA.restaurantId).not.toBe(resultB.restaurantId);

    const count = await ctx.prisma.menuCategory.count({
      where: { slug: 'tatlilar', deletedAt: null },
    });
    expect(count).toBe(2);
  });

  it('4 — soft deleted slug tekrar kullanılabilir', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);

    const archived = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Eski Menü', 'eski-menu')),
    );

    await runWithTenant(restaurant.id, () =>
      ctx.archiveCategoryUseCase.execute(new ArchiveCategoryCommand(archived.id)),
    );

    const archivedRow = await ctx.prisma.menuCategory.findUnique({
      where: { id: archived.id },
    });
    expect(archivedRow?.deletedAt).not.toBeNull();
    expect(archivedRow?.status).toBe('archived');

    const recreated = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(
        new CreateCategoryCommand('Yeni Menü', 'eski-menu', 'Aynı slug, yeni kayıt'),
      ),
    );

    expect(recreated.id).not.toBe(archived.id);
    expect(recreated.slug).toBe('eski-menu');

    const activeCount = await ctx.prisma.menuCategory.count({
      where: { restaurantId: restaurant.id, slug: 'eski-menu', deletedAt: null },
    });
    expect(activeCount).toBe(1);
  });

  it('5 — transaction rollback çalışır', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);
    const slug = `rollback-${randomUUID().slice(0, 8)}`;

    await expect(
      runWithTenant(restaurant.id, () =>
        ctx.unitOfWork.runInTransaction(async () => {
          const category = MenuCategory.create({
            restaurantId: restaurant.id,
            name: 'Rollback Test',
            slug,
          });

          await ctx.categoryRepository.save(category);
          throw new Error('forced rollback');
        }),
      ),
    ).rejects.toThrow('forced rollback');

    const count = await ctx.prisma.menuCategory.count({
      where: { restaurantId: restaurant.id, slug },
    });
    expect(count).toBe(0);
  });

  it('6 — optimistic lock conflict oluşur', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);

    const created = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Kilit Test', 'kilit-test')),
    );

    const loaded = await ctx.categoryRepository.findById(restaurant.id, created.id);
    expect(loaded).not.toBeNull();

    const staleProps = loaded!.toProps();
    staleProps.version = 999;
    staleProps.name = 'Stale Update';

    await expect(
      ctx.categoryRepository.save(MenuCategory.reconstitute(staleProps)),
    ).rejects.toBeInstanceOf(ConflictException);

    const unchanged = await ctx.prisma.menuCategory.findUnique({ where: { id: created.id } });
    expect(unchanged?.name).toBe('Kilit Test');
    expect(unchanged?.version).toBe(1);
  });

  it('7 — domain event commit sonrası publish edilir', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);

    await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Event Test', 'event-test')),
    );

    expect(ctx.fakeEventPublisher.publishedEvents).toHaveLength(1);
    expect(ctx.fakeEventPublisher.publishedEvents[0].eventName).toBe('menu.category.created');

    const payload = ctx.fakeEventPublisher.publishedEvents[0].payload as {
      categoryId: string;
      slug: string;
    };
    expect(payload.slug).toBe('event-test');

    const inDb = await ctx.prisma.menuCategory.findFirst({
      where: { id: payload.categoryId, deletedAt: null },
    });
    expect(inDb).not.toBeNull();

    let afterCommitFired = false;

    await runWithTenant(restaurant.id, () =>
      ctx.unitOfWork.runInTransaction(async (unitCtx) => {
        const category = MenuCategory.create({
          restaurantId: restaurant.id,
          name: 'After Commit',
          slug: 'after-commit',
        });

        await ctx.categoryRepository.save(category);

        unitCtx.afterCommit(() => {
          afterCommitFired = true;
        });

        expect(afterCommitFired).toBe(false);
      }),
    );

    expect(afterCommitFired).toBe(true);
  });

  it('8 — displayOrder otomatik atanır', async () => {
    const restaurant = await seedRestaurant(ctx.prisma);

    const first = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Birinci Kategori')),
    );

    const second = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('İkinci Kategori')),
    );

    const third = await runWithTenant(restaurant.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Üçüncü Kategori')),
    );

    expect(first.displayOrder).toBe(1);
    expect(second.displayOrder).toBe(2);
    expect(third.displayOrder).toBe(3);
  });

  it('9 — tenant olmayan request reddedilir', async () => {
    await seedRestaurant(ctx.prisma);

    await expect(
      runWithoutTenant(() =>
        ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Tenant Yok')),
      ),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'TENANT_CONTEXT_REQUIRED',
      statusCode: 401,
    });

    expect(ctx.fakeEventPublisher.publishedEvents).toHaveLength(0);
  });

  it('10 — repository yalnızca tenant içindeki kayıtları döndürür', async () => {
    const restaurantA = await seedRestaurant(ctx.prisma, { name: 'Tenant A' });
    const restaurantB = await seedRestaurant(ctx.prisma, { name: 'Tenant B' });

    const categoryA = await runWithTenant(restaurantA.id, () =>
      ctx.createCategoryUseCase.execute(new CreateCategoryCommand('Tenant A Kategori', 'tenant-a')),
    );

    const crossTenantLookup = await ctx.categoryRepository.findById(restaurantB.id, categoryA.id);
    expect(crossTenantLookup).toBeNull();

    const crossTenantSlug = await ctx.categoryRepository.findBySlug(restaurantB.id, 'tenant-a');
    expect(crossTenantSlug).toBeNull();

    const ownTenantLookup = await ctx.categoryRepository.findById(restaurantA.id, categoryA.id);
    expect(ownTenantLookup).not.toBeNull();
    expect(ownTenantLookup?.id).toBe(categoryA.id);
  });
});
