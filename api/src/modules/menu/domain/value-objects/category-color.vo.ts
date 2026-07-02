import { DomainException } from '@/shared/exceptions/domain.exception';

const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export class CategoryColor {
  private constructor(public readonly value: string) {}

  static create(value: string): CategoryColor {
    const trimmed = value.trim();

    if (!HEX_COLOR_PATTERN.test(trimmed)) {
      throw new DomainException(
        'Color must be a valid hex code (#RRGGBB)',
        'INVALID_CATEGORY_COLOR',
        400,
        { value },
      );
    }

    return new CategoryColor(trimmed.toUpperCase());
  }

  static createOptional(value?: string | null): CategoryColor | null {
    if (value === undefined || value === null || value.trim() === '') {
      return null;
    }
    return CategoryColor.create(value);
  }
}
