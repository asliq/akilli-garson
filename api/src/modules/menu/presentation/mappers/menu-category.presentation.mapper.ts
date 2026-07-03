import { CreateCategoryCommand } from '../../application/commands/create-category.command';
import { CreateCategoryResult } from '../../application/results/create-category.result';
import { ListCategoriesQuery } from '../../application/queries/list-categories.query';
import { GetCategoryQuery } from '../../application/queries/get-category.query';
import { CreateMenuCategoryRequestDto } from '../dto/requests/create-menu-category.request.dto';
import { ListMenuCategoriesQueryDto } from '../dto/requests/list-menu-categories.query.dto';
import { MenuCategoryResponseDto } from '../dto/responses/menu-category.response.dto';

export class MenuCategoryPresentationMapper {
  static toCreateCommand(dto: CreateMenuCategoryRequestDto): CreateCategoryCommand {
    return new CreateCategoryCommand(
      dto.name,
      dto.slug,
      dto.description,
      dto.icon,
      dto.color,
      dto.displayOrder,
      dto.branchId,
    );
  }

  static toListQuery(dto: ListMenuCategoriesQueryDto): ListCategoriesQuery {
    return new ListCategoriesQuery(dto.branchId);
  }

  static toGetQuery(categoryId: string): GetCategoryQuery {
    return new GetCategoryQuery(categoryId);
  }

  static toResponse(result: CreateCategoryResult): MenuCategoryResponseDto {
    return {
      id: result.id,
      restaurantId: result.restaurantId,
      branchId: result.branchId,
      name: result.name,
      slug: result.slug,
      description: result.description,
      icon: result.icon,
      color: result.color,
      displayOrder: result.displayOrder,
      status: result.status,
      version: result.version,
      createdAt: result.createdAt,
    };
  }

  static toResponseList(results: CreateCategoryResult[]): MenuCategoryResponseDto[] {
    return results.map((result) => MenuCategoryPresentationMapper.toResponse(result));
  }
}
