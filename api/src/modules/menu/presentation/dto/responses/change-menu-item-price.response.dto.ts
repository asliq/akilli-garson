import { ApiProperty } from '@nestjs/swagger';

export class ChangeMenuItemPriceResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  menuItemId!: string;

  @ApiProperty({ example: '660e8400-e29b-41d4-a716-446655440001' })
  priceId!: string;

  @ApiProperty({ example: '27500', description: 'Price in minor units (e.g. kuruş for TRY)' })
  amountMinor!: string;

  @ApiProperty({ example: 'TRY' })
  currencyCode!: string;

  @ApiProperty({ example: 2 })
  version!: number;

  @ApiProperty({ example: '2026-07-03T09:30:00.000Z' })
  updatedAt!: Date;
}
