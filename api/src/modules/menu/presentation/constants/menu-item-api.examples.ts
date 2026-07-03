import { ApiResponseDto } from '@/shared/dto/api-response.dto';
import { MenuItemStatus } from '../../domain/enums/menu-item-status.enum';
import { MenuItemType } from '../../domain/enums/menu-item-type.enum';
import { AttachMenuItemToCategoryResponseDto } from '../dto/responses/attach-menu-item-to-category.response.dto';
import { ChangeMenuItemPriceResponseDto } from '../dto/responses/change-menu-item-price.response.dto';
import { MenuItemResponseDto } from '../dto/responses/menu-item.response.dto';

export class MenuItemApiExamples {
  static readonly successEnvelope = {
    success: true,
    statusCode: 200,
    message: 'Success',
    timestamp: '2026-07-03T09:00:00.000Z',
    path: '/api/v1/menu/items',
  };

  static readonly item: MenuItemResponseDto = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    restaurantId: '660e8400-e29b-41d4-a716-446655440001',
    name: 'Izgara Köfte',
    sku: 'IZGARA-KOFTE-01',
    slug: 'izgara-kofte',
    description: 'Dana kıyma ile hazırlanan ızgara köfte',
    imageUrl: 'https://cdn.example.com/items/kofte.jpg',
    status: MenuItemStatus.DRAFT,
    itemType: MenuItemType.SIMPLE,
    taxCategoryId: null,
    kitchenStationId: null,
    preparationTimeSeconds: 900,
    caloriesKcal: 450,
    basePriceMinor: '25000',
    currencyCode: 'TRY',
    version: 1,
    createdAt: new Date('2026-07-03T09:00:00.000Z'),
  };

  static readonly createdResponse: ApiResponseDto<MenuItemResponseDto> = {
    ...MenuItemApiExamples.successEnvelope,
    statusCode: 201,
    path: '/api/v1/menu/items',
    data: MenuItemApiExamples.item,
  };

  static readonly listResponse: ApiResponseDto<MenuItemResponseDto[]> = {
    ...MenuItemApiExamples.successEnvelope,
    data: [MenuItemApiExamples.item],
  };

  static readonly placement: AttachMenuItemToCategoryResponseDto = {
    placementId: '770e8400-e29b-41d4-a716-446655440002',
    categoryId: '880e8400-e29b-41d4-a716-446655440003',
    menuItemId: '550e8400-e29b-41d4-a716-446655440000',
    displayOrder: 0,
    isPrimary: true,
    createdAt: new Date('2026-07-03T09:00:00.000Z'),
  };

  static readonly attachResponse: ApiResponseDto<AttachMenuItemToCategoryResponseDto> = {
    ...MenuItemApiExamples.successEnvelope,
    statusCode: 201,
    path: '/api/v1/menu/items/550e8400-e29b-41d4-a716-446655440000/categories',
    data: MenuItemApiExamples.placement,
  };

  static readonly priceChange: ChangeMenuItemPriceResponseDto = {
    menuItemId: '550e8400-e29b-41d4-a716-446655440000',
    priceId: '990e8400-e29b-41d4-a716-446655440004',
    amountMinor: '27500',
    currencyCode: 'TRY',
    version: 2,
    updatedAt: new Date('2026-07-03T09:30:00.000Z'),
  };

  static readonly priceChangeResponse: ApiResponseDto<ChangeMenuItemPriceResponseDto> = {
    ...MenuItemApiExamples.successEnvelope,
    path: '/api/v1/menu/items/550e8400-e29b-41d4-a716-446655440000/price',
    data: MenuItemApiExamples.priceChange,
  };

  static readonly errorEnvelope = {
    success: false,
    timestamp: '2026-07-03T09:00:00.000Z',
    path: '/api/v1/menu/items',
  };
}
