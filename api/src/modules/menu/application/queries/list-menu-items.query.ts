import { MenuItemStatus } from '../../domain/enums/menu-item-status.enum';

export class ListMenuItemsQuery {
  constructor(
    public readonly categoryId?: string,
    public readonly status?: MenuItemStatus,
  ) {}
}
