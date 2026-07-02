import { MenuCategory } from '../../domain/entities/menu-category.entity';
import { MenuCategoryStatus } from '../../domain/enums/menu-category-status.enum';

export class CreateCategoryOutputDto {
  id!: string;
  restaurantId!: string;
  branchId!: string | null;
  name!: string;
  slug!: string;
  description!: string | null;
  icon!: string | null;
  color!: string | null;
  displayOrder!: number;
  status!: MenuCategoryStatus;
  version!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static fromDomain(category: MenuCategory): CreateCategoryOutputDto {
    return {
      id: category.id,
      restaurantId: category.restaurantId,
      branchId: category.branchId,
      name: category.name,
      slug: category.slug.value,
      description: category.description,
      icon: category.icon,
      color: category.color?.value ?? null,
      displayOrder: category.displayOrder.value,
      status: category.status,
      version: category.version,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
