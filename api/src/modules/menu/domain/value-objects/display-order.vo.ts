import { DomainException } from '@/shared/exceptions/domain.exception';

export class DisplayOrder {
  private constructor(public readonly value: number) {}

  static create(value?: number): DisplayOrder {
    const order = value ?? 0;

    if (!Number.isInteger(order) || order < 0) {
      throw new DomainException(
        'Display order must be a non-negative integer',
        'INVALID_DISPLAY_ORDER',
        400,
        { value },
      );
    }

    return new DisplayOrder(order);
  }
}
