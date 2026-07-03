import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { GetCategoryUseCase } from '../../application/use-cases/get-category.use-case';
import { ListCategoriesUseCase } from '../../application/use-cases/list-categories.use-case';
import { MenuCategoryApiExamples } from '../constants/menu-category-api.examples';
import { CreateMenuCategoryRequestDto } from '../dto/requests/create-menu-category.request.dto';
import { ListMenuCategoriesQueryDto } from '../dto/requests/list-menu-categories.query.dto';
import { MenuCategoryResponseDto } from '../dto/responses/menu-category.response.dto';
import { MenuCategoryPresentationMapper } from '../mappers/menu-category.presentation.mapper';

@ApiTags('Menu Categories')
@ApiSecurity('restaurant-id')
@Controller('menu/categories')
export class MenuCategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a menu category' })
  @ApiCreatedResponse({
    description: 'Category created successfully',
    schema: {
      example: MenuCategoryApiExamples.createdResponse,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        ...MenuCategoryApiExamples.errorEnvelope,
        statusCode: 400,
        message: 'Validation failed',
        code: 'BAD_REQUEST',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuCategoryApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Duplicate slug or branch name',
    schema: {
      example: {
        ...MenuCategoryApiExamples.errorEnvelope,
        statusCode: 409,
        message: "Category slug 'ana-yemekler' already exists",
        code: 'CONFLICT',
      },
    },
  })
  async create(
    @Body() body: CreateMenuCategoryRequestDto,
  ): Promise<MenuCategoryResponseDto> {
    const result = await this.createCategoryUseCase.execute(
      MenuCategoryPresentationMapper.toCreateCommand(body),
    );

    return MenuCategoryPresentationMapper.toResponse(result);
  }

  @Get()
  @ApiOperation({ summary: 'List menu categories for the current restaurant' })
  @ApiOkResponse({
    description: 'Categories retrieved successfully',
    schema: {
      example: MenuCategoryApiExamples.listResponse,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuCategoryApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async list(
    @Query() query: ListMenuCategoriesQueryDto,
  ): Promise<MenuCategoryResponseDto[]> {
    const results = await this.listCategoriesUseCase.execute(
      MenuCategoryPresentationMapper.toListQuery(query),
    );

    return MenuCategoryPresentationMapper.toResponseList(results);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu category by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({
    description: 'Category retrieved successfully',
    schema: {
      example: {
        ...MenuCategoryApiExamples.successEnvelope,
        data: MenuCategoryApiExamples.category,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
    schema: {
      example: {
        ...MenuCategoryApiExamples.errorEnvelope,
        statusCode: 404,
        message: "Category with id '550e8400-e29b-41d4-a716-446655440000' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuCategoryApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async getById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MenuCategoryResponseDto> {
    const result = await this.getCategoryUseCase.execute(
      MenuCategoryPresentationMapper.toGetQuery(id),
    );

    return MenuCategoryPresentationMapper.toResponse(result);
  }
}
