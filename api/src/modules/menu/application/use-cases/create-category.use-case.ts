import { Inject, Injectable } from '@nestjs/common';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';
import { getRestaurantId } from '@/core/tenant/tenant.context';
import { ConflictException } from '@/shared/exceptions/conflict.exception';
import { DomainException } from '@/shared/exceptions/domain.exception';
import { CreateCategoryInputDto } from '../dto/create-category.input.dto';
import { CreateCategoryOutputDto } from '../dto/create-category.output.dto';
import { MenuCategory } from '../../domain/entities/menu-category.entity';
import { CategoryCreatedEvent } from '../../domain/events/category-created.event';
import {
  IMenuCategoryRepository,
  MENU_CATEGORY_REPOSITORY,
} from '../../domain/repositories/menu-category.repository.interface';
import { CategorySlug } from '../../domain/value-objects/category-slug.vo';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(MENU_CATEGORY_REPOSITORY)
    private readonly categoryRepository: IMenuCategoryRepository,
    private readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(
    input: CreateCategoryInputDto,
    actorId?: string,
  ): Promise<CreateCategoryOutputDto> {
    const restaurantId = getRestaurantId();

    if (!restaurantId) {
      throw new DomainException(
        'Restaurant context is required to create a category',
        'TENANT_CONTEXT_REQUIRED',
        401,
      );
    }

    const slug = input.slug ? CategorySlug.create(input.slug) : CategorySlug.fromName(input.name);

    await this.ensureSlugIsUnique(restaurantId, slug.value);

    if (input.branchId) {
      await this.ensureBranchNameIsUnique(restaurantId, input.branchId, input.name.trim());
    }

    const displayOrder =
      input.displayOrder ?? (await this.resolveNextDisplayOrder(restaurantId, input.branchId ?? null));

    const category = MenuCategory.create({
      restaurantId,
      name: input.name,
      slug: slug.value,
      description: input.description,
      icon: input.icon,
      color: input.color,
      displayOrder,
      branchId: input.branchId,
      createdBy: actorId,
    });

    const saved = await this.categoryRepository.save(category);

    this.eventPublisher.publish(
      new CategoryCreatedEvent({
        categoryId: saved.id,
        restaurantId: saved.restaurantId,
        branchId: saved.branchId,
        name: saved.name,
        slug: saved.slug.value,
        displayOrder: saved.displayOrder.value,
        status: saved.status,
      }),
    );

    return CreateCategoryOutputDto.fromDomain(saved);
  }

  private async ensureSlugIsUnique(restaurantId: string, slug: string): Promise<void> {
    const existing = await this.categoryRepository.findBySlug(restaurantId, slug);

    if (existing) {
      throw new ConflictException(`Category slug '${slug}' already exists`, {
        restaurantId,
        slug,
      });
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
      throw new ConflictException(
        `Category name '${name}' already exists for this branch`,
        { restaurantId, branchId, name },
      );
    }
  }

  private async resolveNextDisplayOrder(
    restaurantId: string,
    branchId: string | null,
  ): Promise<number> {
    const maxOrder = await this.categoryRepository.getMaxDisplayOrder(restaurantId, branchId);
    return maxOrder + 1;
  }
}
