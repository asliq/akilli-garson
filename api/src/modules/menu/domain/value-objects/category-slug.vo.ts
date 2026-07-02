import { DomainException } from '@/shared/exceptions/domain.exception';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class CategorySlug {
  private constructor(public readonly value: string) {}

  static create(value: string): CategorySlug {
    const normalized = value.trim().toLowerCase();

    if (normalized.length === 0 || normalized.length > 150) {
      throw new DomainException(
        'Slug must be between 1 and 150 characters',
        'INVALID_CATEGORY_SLUG',
        400,
        { value },
      );
    }

    if (!SLUG_PATTERN.test(normalized)) {
      throw new DomainException(
        'Slug must contain only lowercase letters, numbers, and hyphens',
        'INVALID_CATEGORY_SLUG',
        400,
        { value },
      );
    }

    return new CategorySlug(normalized);
  }

  static fromName(name: string): CategorySlug {
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
        'INVALID_CATEGORY_SLUG',
        400,
        { name },
      );
    }

    return CategorySlug.create(slug.slice(0, 150));
  }
}
