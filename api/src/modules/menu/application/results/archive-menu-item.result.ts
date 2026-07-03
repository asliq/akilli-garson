import { MenuItem } from '../../domain/entities/menu-item.entity';
import { MenuItemStatus } from '../../domain/enums/menu-item-status.enum';

export class ArchiveMenuItemResult {
  id!: string;
  restaurantId!: string;
  status!: MenuItemStatus;
  version!: number;
  archivedAt!: Date;

  static fromDomain(item: MenuItem): ArchiveMenuItemResult {
    return {
      id: item.id,
      restaurantId: item.restaurantId,
      status: item.status,
      version: item.version,
      archivedAt: item.deletedAt ?? item.updatedAt,
    };
  }
}
