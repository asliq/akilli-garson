import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { ConflictException } from '@/shared/exceptions/conflict.exception';
import { CreateCategoryCommand } from '../commands/create-category.command';
import { CreateCategoryResult } from '../results/create-category.result';
import { requireRestaurantId } from '../helpers/require-restaurant-id.helper';
import { publishDomainEvents } from '../helpers/publish-domain-events.helper';
import { MenuCategoryRepositoryPort } from '../ports/menu-category.repository.port';
import { MENU_CATEGORY_REPOSITORY } from '../ports/tokens';
import { MenuCategory } from '../../domain/entities/menu-category.entity';
import { CategoryCreatedEvent } from '../../domain/events/category-created.event';
import { CategorySlug } from '../../domain/value-objects/category-slug.vo';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(MENU_CATEGORY_REPOSITORY)
    private readonly categoryRepository: MenuCategoryRepositoryPort,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: CreateCategoryCommand, actorId?: string): Promise<CreateCategoryResult> {
    const restaurantId = requireRestaurantId();

    const slug = command.slug
      ? CategorySlug.create(command.slug)
      : CategorySlug.fromName(command.name);

    await this.ensureSlugIsUnique(restaurantId, slug.value);

    if (command.branchId) {
      await this.ensureBranchNameIsUnique(restaurantId, command.branchId, command.name.trim());
    }

    const displayOrder =
      command.displayOrder ??
      (await this.resolveNextDisplayOrder(restaurantId, command.branchId ?? null));

    const category = MenuCategory.create({
      restaurantId,
      name: command.name,
      slug: slug.value,
      description: command.description,
      icon: command.icon,
      color: command.color,
      displayOrder,
      branchId: command.branchId,
      createdBy: actorId,
    });

    const saved = await this.categoryRepository.save(category);

    publishDomainEvents(this.eventPublisher, [
      new CategoryCreatedEvent({
        categoryId: saved.id,
        restaurantId: saved.restaurantId,
        branchId: saved.branchId,
        name: saved.name,
        slug: saved.slug.value,
        displayOrder: saved.displayOrder.value,
        status: saved.status,
      }),
    ]);

    return CreateCategoryResult.fromDomain(saved);
  }

  private async ensureSlugIsUnique(restaurantId: string, slug: string): Promise<void> {
    const existing = await this.categoryRepository.findBySlug(restaurantId, slug);
    if (existing) {
      throw new ConflictException(`Category slug '${slug}' already exists`, { restaurantId, slug });
    }
  }

  private async ensureBranchNameIsUnique(
    restaurantId: string,
    branchId: string,
    name: string,
  ): Promise<void> {
    const existing = await this.categoryRepository.findByNameAndBranch(
      restaurantId,
      branchId,
      name,
    );
    if (existing) {
      throw new ConflictException(`Category name '${name}' already exists for this branch`, {
        restaurantId,
        branchId,
        name,
      });
    }
  }

  private async resolveNextDisplayOrder(
    restaurantId: string,
    branchId: string | null,
  ): Promise<number> {
    return (await this.categoryRepository.getMaxDisplayOrder(restaurantId, branchId)) + 1;
  }
}
