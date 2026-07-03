import { CategoryPlacement } from '../../domain/entities/category-placement.entity';

export class AttachMenuItemToCategoryResult {
  placementId!: string;
  categoryId!: string;
  menuItemId!: string;
  displayOrder!: number;
  isPrimary!: boolean;
  createdAt!: Date;

  static fromDomain(placement: CategoryPlacement): AttachMenuItemToCategoryResult {
    return {
      placementId: placement.id,
      categoryId: placement.categoryId,
      menuItemId: placement.menuItemId,
      displayOrder: placement.displayOrder.value,
      isPrimary: placement.isPrimary,
      createdAt: placement.createdAt,
    };
  }
}
