export class CreateCategoryCommand {
  constructor(
    public readonly name: string,
    public readonly slug?: string,
    public readonly description?: string,
    public readonly icon?: string,
    public readonly color?: string,
    public readonly displayOrder?: number,
    public readonly branchId?: string,
  ) {}
}
