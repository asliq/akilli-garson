export class AttachMenuItemToCategoryCommand {
  constructor(
    public readonly categoryId: string,
    public readonly menuItemId: string,
    public readonly displayOrder?: number,
    public readonly isPrimary?: boolean,
  ) {}
}
