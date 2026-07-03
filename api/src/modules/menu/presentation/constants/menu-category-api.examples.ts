import { ApiResponseDto } from '@/shared/dto/api-response.dto';
import { MenuCategoryStatus } from '../../domain/enums/menu-category-status.enum';
import { MenuCategoryResponseDto } from '../dto/responses/menu-category.response.dto';

export class MenuCategoryApiExamples {
  static readonly successEnvelope = {
    success: true,
    statusCode: 200,
    message: 'Success',
    timestamp: '2026-07-03T09:00:00.000Z',
    path: '/api/v1/menu/categories',
  };

  static readonly category: MenuCategoryResponseDto = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    restaurantId: '660e8400-e29b-41d4-a716-446655440001',
    branchId: null,
    name: 'Ana Yemekler',
    slug: 'ana-yemekler',
    description: 'Restoranın ana yemek kategorisi',
    icon: 'utensils',
    color: '#FF5733',
    displayOrder: 1,
    status: MenuCategoryStatus.ACTIVE,
    version: 1,
    createdAt: new Date('2026-07-03T09:00:00.000Z'),
  };

  static readonly createdResponse: ApiResponseDto<MenuCategoryResponseDto> = {
    ...MenuCategoryApiExamples.successEnvelope,
    statusCode: 201,
    path: '/api/v1/menu/categories',
    data: MenuCategoryApiExamples.category,
  };

  static readonly listResponse: ApiResponseDto<MenuCategoryResponseDto[]> = {
    ...MenuCategoryApiExamples.successEnvelope,
    data: [MenuCategoryApiExamples.category],
  };

  static readonly errorEnvelope = {
    success: false,
    timestamp: '2026-07-03T09:00:00.000Z',
    path: '/api/v1/menu/categories',
  };
}
