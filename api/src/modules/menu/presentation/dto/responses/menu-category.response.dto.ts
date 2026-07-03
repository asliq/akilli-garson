import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MenuCategoryStatus } from '../../../domain/enums/menu-category-status.enum';

export class MenuCategoryResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id!: string;

  @ApiProperty({ example: '660e8400-e29b-41d4-a716-446655440001' })
  restaurantId!: string;

  @ApiPropertyOptional({ example: '770e8400-e29b-41d4-a716-446655440002', nullable: true })
  branchId!: string | null;

  @ApiProperty({ example: 'Ana Yemekler' })
  name!: string;

  @ApiProperty({ example: 'ana-yemekler' })
  slug!: string;

  @ApiPropertyOptional({ example: 'Restoranın ana yemek kategorisi', nullable: true })
  description!: string | null;

  @ApiPropertyOptional({ example: 'utensils', nullable: true })
  icon!: string | null;

  @ApiPropertyOptional({ example: '#FF5733', nullable: true })
  color!: string | null;

  @ApiProperty({ example: 1 })
  displayOrder!: number;

  @ApiProperty({ enum: MenuCategoryStatus, example: MenuCategoryStatus.ACTIVE })
  status!: MenuCategoryStatus;

  @ApiProperty({ example: 1 })
  version!: number;

  @ApiProperty({ example: '2026-07-03T09:00:00.000Z' })
  createdAt!: Date;
}
