import { MenuCategory } from '../../domain/entities/menu-category.entity';
import { MenuCategoryStatus } from '../../domain/enums/menu-category-status.enum';

export class ArchiveCategoryResult {
  id!: string;
  restaurantId!: string;
  status!: MenuCategoryStatus;
  version!: number;
  archivedAt!: Date;

  static fromDomain(category: MenuCategory): ArchiveCategoryResult {
    return {
      id: category.id,
      restaurantId: category.restaurantId,
      status: category.status,
      version: category.version,
      archivedAt: category.deletedAt ?? category.updatedAt,
    };
  }
}
