import { AttachMenuItemToCategoryCommand } from '../../application/commands/attach-menu-item-to-category.command';
import { ChangeMenuItemPriceCommand } from '../../application/commands/change-menu-item-price.command';
import { CreateMenuItemCommand } from '../../application/commands/create-menu-item.command';
import { GetMenuItemQuery } from '../../application/queries/get-menu-item.query';
import { ListMenuItemsQuery } from '../../application/queries/list-menu-items.query';
import { AttachMenuItemToCategoryResult } from '../../application/results/attach-menu-item-to-category.result';
import { ChangeMenuItemPriceResult } from '../../application/results/change-menu-item-price.result';
import { CreateMenuItemResult } from '../../application/results/create-menu-item.result';
import { AttachMenuItemToCategoryRequestDto } from '../dto/requests/attach-menu-item-to-category.request.dto';
import { ChangeMenuItemPriceRequestDto } from '../dto/requests/change-menu-item-price.request.dto';
import { CreateMenuItemRequestDto } from '../dto/requests/create-menu-item.request.dto';
import { ListMenuItemsQueryDto } from '../dto/requests/list-menu-items.query.dto';
import { AttachMenuItemToCategoryResponseDto } from '../dto/responses/attach-menu-item-to-category.response.dto';
import { ChangeMenuItemPriceResponseDto } from '../dto/responses/change-menu-item-price.response.dto';
import { MenuItemResponseDto } from '../dto/responses/menu-item.response.dto';

export class MenuItemPresentationMapper {
  static toCreateCommand(dto: CreateMenuItemRequestDto): CreateMenuItemCommand {
    return new CreateMenuItemCommand(
      dto.name,
      dto.sku,
      dto.amountMinor,
      dto.currencyCode,
      dto.slug,
      dto.description,
      dto.imageUrl,
      dto.itemType,
      dto.taxCategoryId,
      dto.kitchenStationId,
      dto.preparationTimeSeconds,
      dto.caloriesKcal,
    );
  }

  static toListQuery(dto: ListMenuItemsQueryDto): ListMenuItemsQuery {
    return new ListMenuItemsQuery(dto.categoryId, dto.status);
  }

  static toGetQuery(menuItemId: string): GetMenuItemQuery {
    return new GetMenuItemQuery(menuItemId);
  }

  static toAttachCommand(
    menuItemId: string,
    dto: AttachMenuItemToCategoryRequestDto,
  ): AttachMenuItemToCategoryCommand {
    return new AttachMenuItemToCategoryCommand(
      dto.categoryId,
      menuItemId,
      dto.displayOrder,
      dto.isPrimary,
    );
  }

  static toChangePriceCommand(
    menuItemId: string,
    dto: ChangeMenuItemPriceRequestDto,
  ): ChangeMenuItemPriceCommand {
    return new ChangeMenuItemPriceCommand(menuItemId, dto.amountMinor, dto.currencyCode);
  }

  static toResponse(result: CreateMenuItemResult): MenuItemResponseDto {
    return {
      id: result.id,
      restaurantId: result.restaurantId,
      name: result.name,
      sku: result.sku,
      slug: result.slug,
      description: result.description,
      imageUrl: result.imageUrl,
      status: result.status,
      itemType: result.itemType,
      taxCategoryId: result.taxCategoryId,
      kitchenStationId: result.kitchenStationId,
      preparationTimeSeconds: result.preparationTimeSeconds,
      caloriesKcal: result.caloriesKcal,
      basePriceMinor: result.basePriceMinor,
      currencyCode: result.currencyCode,
      version: result.version,
      createdAt: result.createdAt,
    };
  }

  static toResponseList(results: CreateMenuItemResult[]): MenuItemResponseDto[] {
    return results.map((result) => MenuItemPresentationMapper.toResponse(result));
  }

  static toAttachResponse(
    result: AttachMenuItemToCategoryResult,
  ): AttachMenuItemToCategoryResponseDto {
    return {
      placementId: result.placementId,
      categoryId: result.categoryId,
      menuItemId: result.menuItemId,
      displayOrder: result.displayOrder,
      isPrimary: result.isPrimary,
      createdAt: result.createdAt,
    };
  }

  static toPriceChangeResponse(result: ChangeMenuItemPriceResult): ChangeMenuItemPriceResponseDto {
    return {
      menuItemId: result.menuItemId,
      priceId: result.priceId,
      amountMinor: result.amountMinor,
      currencyCode: result.currencyCode,
      version: result.version,
      updatedAt: result.updatedAt,
    };
  }
}
