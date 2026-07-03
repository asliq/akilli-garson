import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuItemStatus } from '../../../domain/enums/menu-item-status.enum';
import { MenuItemType } from '../../../domain/enums/menu-item-type.enum';

export class MenuItemResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: '660e8400-e29b-41d4-a716-446655440001' })
  restaurantId!: string;

  @ApiProperty({ example: 'Izgara Köfte' })
  name!: string;

  @ApiProperty({ example: 'IZGARA-KOFTE-01' })
  sku!: string;

  @ApiPropertyOptional({ example: 'izgara-kofte', nullable: true })
  slug!: string | null;

  @ApiPropertyOptional({ example: 'Dana kıyma ile hazırlanan ızgara köfte', nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/items/kofte.jpg', nullable: true })
  imageUrl!: string | null;

  @ApiProperty({ enum: MenuItemStatus, example: MenuItemStatus.DRAFT })
  status!: MenuItemStatus;

  @ApiProperty({ enum: MenuItemType, example: MenuItemType.SIMPLE })
  itemType!: MenuItemType;

  @ApiPropertyOptional({ example: '770e8400-e29b-41d4-a716-446655440002', nullable: true })
  taxCategoryId!: string | null;

  @ApiPropertyOptional({ example: '880e8400-e29b-41d4-a716-446655440003', nullable: true })
  kitchenStationId!: string | null;

  @ApiPropertyOptional({ example: 900, nullable: true })
  preparationTimeSeconds!: number | null;

  @ApiPropertyOptional({ example: 450, nullable: true })
  caloriesKcal!: number | null;

  @ApiProperty({ example: '25000', description: 'Price in minor units (e.g. kuruş for TRY)' })
  basePriceMinor!: string;

  @ApiProperty({ example: 'TRY' })
  currencyCode!: string;

  @ApiProperty({ example: 1 })
  version!: number;

  @ApiProperty({ example: '2026-07-03T09:00:00.000Z' })
  createdAt!: Date;
}
