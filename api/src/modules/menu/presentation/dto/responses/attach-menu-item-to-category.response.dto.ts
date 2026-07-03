import { ApiProperty } from '@nestjs/swagger';

export class AttachMenuItemToCategoryResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  placementId!: string;

  @ApiProperty({ example: '660e8400-e29b-41d4-a716-446655440001' })
  categoryId!: string;

  @ApiProperty({ example: '770e8400-e29b-41d4-a716-446655440002' })
  menuItemId!: string;

  @ApiProperty({ example: 0 })
  displayOrder!: number;

  @ApiProperty({ example: true })
  isPrimary!: boolean;

  @ApiProperty({ example: '2026-07-03T09:00:00.000Z' })
  createdAt!: Date;
}
