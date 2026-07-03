import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';

export class ChangeMenuItemPriceRequestDto {
  @ApiProperty({ example: 27500, description: 'Price in minor units (e.g. kuruş for TRY)' })
  @IsInt()
  @Min(0)
  amountMinor!: number;

  @ApiPropertyOptional({ example: 'TRY', maxLength: 3 })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  @Matches(/^[A-Za-z]{3}$/, { message: 'currencyCode must be a 3-letter ISO code' })
  currencyCode?: string;
}
