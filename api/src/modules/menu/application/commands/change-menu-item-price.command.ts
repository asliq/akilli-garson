export class ChangeMenuItemPriceCommand {
  constructor(
    public readonly menuItemId: string,
    public readonly amountMinor: bigint | number,
    public readonly currencyCode?: string,
  ) {}
}
