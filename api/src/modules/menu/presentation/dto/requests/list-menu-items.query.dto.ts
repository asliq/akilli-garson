import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { MenuItemStatus } from '../../../domain/enums/menu-item-status.enum';

export class ListMenuItemsQueryDto {
  @ApiPropertyOptional({
    description: 'Filter items by category placement',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    enum: MenuItemStatus,
    description: 'Filter items by status',
    example: MenuItemStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(MenuItemStatus)
  status?: MenuItemStatus;
}
