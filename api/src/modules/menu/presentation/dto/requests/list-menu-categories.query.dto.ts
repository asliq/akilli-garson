import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class ListMenuCategoriesQueryDto {
  @ApiPropertyOptional({
    description: 'Filter categories by branch. Omit to list all branches.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  branchId?: string;
}
