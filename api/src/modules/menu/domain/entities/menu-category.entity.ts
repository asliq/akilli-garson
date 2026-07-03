import { randomUUID } from 'crypto';
import { DomainException } from '@/shared/exceptions/domain.exception';
import { MenuCategoryStatus } from '../enums/menu-category-status.enum';
import { CategoryColor } from '../value-objects/category-color.vo';
import { CategorySlug } from '../value-objects/category-slug.vo';
import { DisplayOrder } from '../value-objects/display-order.vo';

export interface CreateMenuCategoryProps {
  restaurantId: string;
  name: string;
  slug?: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  displayOrder?: number;
  branchId?: string | null;
  createdBy?: string | null;
}

export interface MenuCategoryProps {
  id: string;
  restaurantId: string;
  branchId: string | null;
  name: string;
  slug: CategorySlug;
  description: string | null;
  icon: string | null;
  color: CategoryColor | null;
  displayOrder: DisplayOrder;
  status: MenuCategoryStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string | null;
  updatedBy: string | null;
  deletedAt: Date | null;
  version: number;
}

export class MenuCategory {
  private constructor(private readonly props: MenuCategoryProps) {}

  static create(input: CreateMenuCategoryProps): MenuCategory {
    const now = new Date();
    const slug = input.slug ? CategorySlug.create(input.slug) : CategorySlug.fromName(input.name);

    return new MenuCategory({
      id: randomUUID(),
      restaurantId: input.restaurantId,
      branchId: input.branchId ?? null,
      name: input.name.trim(),
      slug,
      description: input.description?.trim() ?? null,
      icon: input.icon?.trim() ?? null,
      color: CategoryColor.createOptional(input.color),
      displayOrder: DisplayOrder.create(input.displayOrder),
      status: MenuCategoryStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
      createdBy: input.createdBy ?? null,
      updatedBy: input.createdBy ?? null,
      deletedAt: null,
      version: 1,
    });
  }

  static reconstitute(props: MenuCategoryProps): MenuCategory {
    return new MenuCategory(props);
  }

  archive(actorId?: string | null): void {
    if (this.props.status === MenuCategoryStatus.ARCHIVED) {
      throw new DomainException('Category is already archived', 'CATEGORY_ALREADY_ARCHIVED', 400);
    }

    this.props.status = MenuCategoryStatus.ARCHIVED;
    this.props.deletedAt = new Date();
    this.props.updatedAt = new Date();
    this.props.updatedBy = actorId ?? this.props.updatedBy;
    this.props.version += 1;
  }

  get id(): string {
    return this.props.id;
  }

  get restaurantId(): string {
    return this.props.restaurantId;
  }

  get branchId(): string | null {
    return this.props.branchId;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): CategorySlug {
    return this.props.slug;
  }

  get description(): string | null {
    return this.props.description;
  }

  get icon(): string | null {
    return this.props.icon;
  }

  get color(): CategoryColor | null {
    return this.props.color;
  }

  get displayOrder(): DisplayOrder {
    return this.props.displayOrder;
  }

  get status(): MenuCategoryStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get createdBy(): string | null {
    return this.props.createdBy;
  }

  get updatedBy(): string | null {
    return this.props.updatedBy;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  toProps(): MenuCategoryProps {
    return { ...this.props };
  }
}
