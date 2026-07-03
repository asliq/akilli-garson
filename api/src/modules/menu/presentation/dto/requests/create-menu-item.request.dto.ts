import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';
import { MenuItemType } from '../../../domain/enums/menu-item-type.enum';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SKU_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,49}$/;

export class CreateMenuItemRequestDto {
  @ApiProperty({ example: 'Izgara Köfte', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'IZGARA-KOFTE-01', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  @Matches(SKU_PATTERN, {
    message:
      'sku must start with alphanumeric and contain only letters, numbers, underscore, or hyphen',
  })
  sku!: string;

  @ApiProperty({ example: 25000, description: 'Price in minor units (e.g. kuruş for TRY)' })
  @IsInt()
  @Min(0)
  amountMinor!: number;

  @ApiPropertyOptional({ example: 'TRY', maxLength: 3 })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  @Matches(/^[A-Za-z]{3}$/, { message: 'currencyCode must be a 3-letter ISO code' })
  currencyCode?: string;

  @ApiPropertyOptional({ example: 'izgara-kofte', maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  @Matches(SLUG_PATTERN, {
    message: 'slug must contain only lowercase letters, numbers, and hyphens',
  })
  slug?: string;

  @ApiPropertyOptional({ example: 'Dana kıyma ile hazırlanan ızgara köfte' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/items/kofte.jpg' })
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  imageUrl?: string;

  @ApiPropertyOptional({ enum: MenuItemType, example: MenuItemType.SIMPLE })
  @IsOptional()
  @IsEnum(MenuItemType)
  itemType?: MenuItemType;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  taxCategoryId?: string;

  @ApiPropertyOptional({ example: '660e8400-e29b-41d4-a716-446655440001' })
  @IsOptional()
  @IsUUID()
  kitchenStationId?: string;

  @ApiPropertyOptional({ example: 900, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  preparationTimeSeconds?: number;

  @ApiPropertyOptional({ example: 450, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  caloriesKcal?: number;
}
