import { DomainException } from '@/shared/exceptions/domain.exception';

export class Money {
  private constructor(
    public readonly amountMinor: bigint,
    public readonly currencyCode: string,
  ) {}

  static create(amountMinor: bigint | number, currencyCode = 'TRY'): Money {
    const amount = typeof amountMinor === 'bigint' ? amountMinor : BigInt(amountMinor);
    const currency = currencyCode.trim().toUpperCase();

    if (amount < 0n) {
      throw new DomainException('Amount cannot be negative', 'INVALID_MONEY_AMOUNT', 400, {
        amountMinor: amount.toString(),
      });
    }

    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new DomainException('Currency must be a 3-letter ISO code', 'INVALID_CURRENCY', 400, {
        currencyCode: currency,
      });
    }

    return new Money(amount, currency);
  }

  static zero(currencyCode = 'TRY'): Money {
    return Money.create(0n, currencyCode);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amountMinor + other.amountMinor, this.currencyCode);
  }

  equals(other: Money): boolean {
    return this.amountMinor === other.amountMinor && this.currencyCode === other.currencyCode;
  }

  toJSON(): { amountMinor: string; currencyCode: string } {
    return {
      amountMinor: this.amountMinor.toString(),
      currencyCode: this.currencyCode,
    };
  }

  private assertSameCurrency(other: Money): void {
    if (this.currencyCode !== other.currencyCode) {
      throw new DomainException('Currency mismatch', 'CURRENCY_MISMATCH', 400, {
        expected: this.currencyCode,
        received: other.currencyCode,
      });
    }
  }
}
