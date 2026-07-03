import { randomUUID } from 'crypto';
import { MenuItemStatus } from '../enums/menu-item-status.enum';
import { MenuItemType } from '../enums/menu-item-type.enum';
import { MenuItem } from '../entities/menu-item.entity';
import { MenuPrice } from '../entities/menu-price.entity';
import { MenuItemInvariants } from '../invariants/menu-item.invariants';
import { MenuItemSlug } from '../value-objects/menu-item-slug.vo';
import { Sku } from '../value-objects/sku.vo';
import { Money } from '../value-objects/money.vo';

export interface CreateMenuItemDraftInput {
  restaurantId: string;
  name: string;
  sku: string;
  basePrice: Money;
  slug?: string;
  description?: string | null;
  imageUrl?: string | null;
  itemType?: MenuItemType;
  taxCategoryId?: string | null;
  kitchenStationId?: string | null;
  preparationTimeSeconds?: number | null;
  caloriesKcal?: number | null;
  createdBy?: string | null;
}

export class MenuItemFactory {
  static createDraft(input: CreateMenuItemDraftInput): MenuItem {
    const now = new Date();
    const menuItemId = randomUUID();

    MenuItemInvariants.assertPreparationTime(input.preparationTimeSeconds ?? null);
    MenuItemInvariants.assertCalories(input.caloriesKcal ?? null);

    const slug = input.slug
      ? MenuItemSlug.create(input.slug)
      : MenuItemSlug.fromName(input.name);

    const basePrice = MenuPrice.createBase({
      menuItemId,
      amount: input.basePrice,
      createdBy: input.createdBy,
    });

    const item = MenuItem.reconstitute({
      id: menuItemId,
      restaurantId: input.restaurantId,
      itemType: input.itemType ?? MenuItemType.SIMPLE,
      status: MenuItemStatus.DRAFT,
      sku: Sku.create(input.sku),
      name: input.name.trim(),
      slug,
      description: input.description?.trim() ?? null,
      imageUrl: input.imageUrl?.trim() ?? null,
      taxCategoryId: input.taxCategoryId ?? null,
      kitchenStationId: input.kitchenStationId ?? null,
      preparationTimeSeconds: input.preparationTimeSeconds ?? null,
      caloriesKcal: input.caloriesKcal ?? null,
      prices: [basePrice],
      createdAt: now,
      updatedAt: now,
      createdBy: input.createdBy ?? null,
      updatedBy: input.createdBy ?? null,
      deletedAt: null,
      version: 1,
    });

    item.recordCreatedEvent();
    return item;
  }
}
