import { MenuPrice as PrismaMenuPrice, Prisma } from '@prisma/client';
import { MenuPrice } from '../../../domain/entities/menu-price.entity';
import { Money } from '../../../domain/value-objects/money.vo';
import { MenuEnumMapper } from './menu-enum.mapper';

export class MenuPriceMapper {
  static toDomain(record: PrismaMenuPrice): MenuPrice {
    return MenuPrice.reconstitute({
      id: record.id,
      menuItemId: record.menuItemId,
      amount: Money.create(record.amountMinor, record.currencyCode),
      status: MenuEnumMapper.toDomainPriceStatus(record.status),
      branchId: record.branchId,
      salesChannelId: record.salesChannelId,
      priority: record.priority,
      validFrom: record.validFrom,
      validTo: record.validTo,
      label: record.label,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      createdBy: record.createdBy,
      updatedBy: record.updatedBy,
      version: record.version,
    });
  }

  static toCreateInput(
    restaurantId: string,
    price: MenuPrice,
  ): Prisma.MenuPriceCreateInput {
    const props = price.toProps();

    return {
      id: props.id,
      restaurant: { connect: { id: restaurantId } },
      menuItem: { connect: { id: props.menuItemId } },
      amountMinor: props.amount.amountMinor,
      currencyCode: props.amount.currencyCode,
      status: MenuEnumMapper.toPersistencePriceStatus(props.status),
      branchId: props.branchId,
      salesChannelId: props.salesChannelId,
      priority: props.priority,
      validFrom: props.validFrom,
      validTo: props.validTo,
      label: props.label,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      createdBy: props.createdBy,
      updatedBy: props.updatedBy,
      version: props.version,
    };
  }

  static toUpdateInput(price: MenuPrice): Prisma.MenuPriceUpdateInput {
    return MenuPriceMapper.toUpdateManyMutationInput(price);
  }

  static toUpdateManyMutationInput(price: MenuPrice): Prisma.MenuPriceUpdateManyMutationInput {
    const props = price.toProps();

    return {
      amountMinor: props.amount.amountMinor,
      currencyCode: props.amount.currencyCode,
      status: MenuEnumMapper.toPersistencePriceStatus(props.status),
      branchId: props.branchId,
      salesChannelId: props.salesChannelId,
      priority: props.priority,
      validFrom: props.validFrom,
      validTo: props.validTo,
      label: props.label,
      updatedAt: props.updatedAt,
      updatedBy: props.updatedBy,
      version: props.version,
    };
  }
}
