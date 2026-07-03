import { DomainException } from '@/shared/exceptions/domain.exception';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class MenuItemSlug {
  private constructor(public readonly value: string) {}

  static create(value: string): MenuItemSlug {
    const normalized = value.trim().toLowerCase();

    if (normalized.length === 0 || normalized.length > 200) {
      throw new DomainException(
        'Menu item slug must be between 1 and 200 characters',
        'INVALID_MENU_ITEM_SLUG',
        400,
        { value },
      );
    }

    if (!SLUG_PATTERN.test(normalized)) {
      throw new DomainException(
        'Menu item slug must contain only lowercase letters, numbers, and hyphens',
        'INVALID_MENU_ITEM_SLUG',
        400,
        { value },
      );
    }

    return new MenuItemSlug(normalized);
  }

  static fromName(name: string): MenuItemSlug {
    const slug = name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (slug.length === 0) {
      throw new DomainException(
        'Cannot generate slug from the provided name',
        'INVALID_MENU_ITEM_SLUG',
        400,
        { name },
      );
    }

    return MenuItemSlug.create(slug.slice(0, 200));
  }

  static createOptional(value?: string | null): MenuItemSlug | null {
    if (value === undefined || value === null || value.trim() === '') {
      return null;
    }
    return MenuItemSlug.create(value);
  }
}
