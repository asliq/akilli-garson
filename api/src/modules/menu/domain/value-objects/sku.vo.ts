import { DomainException } from '@/shared/exceptions/domain.exception';

const SKU_PATTERN = /^[A-Z0-9][A-Z0-9_-]{0,49}$/i;

export class Sku {
  private constructor(public readonly value: string) {}

  static create(value: string): Sku {
    const normalized = value.trim().toUpperCase();

    if (normalized.length === 0 || normalized.length > 50) {
      throw new DomainException('SKU must be between 1 and 50 characters', 'INVALID_SKU', 400, {
        value,
      });
    }

    if (!SKU_PATTERN.test(normalized)) {
      throw new DomainException(
        'SKU must start with alphanumeric and contain only letters, numbers, underscore, or hyphen',
        'INVALID_SKU',
        400,
        { value },
      );
    }

    return new Sku(normalized);
  }
}
