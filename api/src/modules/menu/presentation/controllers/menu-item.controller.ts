import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AttachMenuItemToCategoryUseCase } from '../../application/use-cases/attach-menu-item-to-category.use-case';
import { ChangeMenuItemPriceUseCase } from '../../application/use-cases/change-menu-item-price.use-case';
import { CreateMenuItemUseCase } from '../../application/use-cases/create-menu-item.use-case';
import { GetMenuItemUseCase } from '../../application/use-cases/get-menu-item.use-case';
import { ListMenuItemsUseCase } from '../../application/use-cases/list-menu-items.use-case';
import { MenuItemApiExamples } from '../constants/menu-item-api.examples';
import { AttachMenuItemToCategoryRequestDto } from '../dto/requests/attach-menu-item-to-category.request.dto';
import { ChangeMenuItemPriceRequestDto } from '../dto/requests/change-menu-item-price.request.dto';
import { CreateMenuItemRequestDto } from '../dto/requests/create-menu-item.request.dto';
import { ListMenuItemsQueryDto } from '../dto/requests/list-menu-items.query.dto';
import { AttachMenuItemToCategoryResponseDto } from '../dto/responses/attach-menu-item-to-category.response.dto';
import { ChangeMenuItemPriceResponseDto } from '../dto/responses/change-menu-item-price.response.dto';
import { MenuItemResponseDto } from '../dto/responses/menu-item.response.dto';
import { MenuItemPresentationMapper } from '../mappers/menu-item.presentation.mapper';

@ApiTags('Menu Items')
@ApiSecurity('restaurant-id')
@Controller('menu/items')
export class MenuItemController {
  constructor(
    private readonly createMenuItemUseCase: CreateMenuItemUseCase,
    private readonly listMenuItemsUseCase: ListMenuItemsUseCase,
    private readonly getMenuItemUseCase: GetMenuItemUseCase,
    private readonly attachMenuItemToCategoryUseCase: AttachMenuItemToCategoryUseCase,
    private readonly changeMenuItemPriceUseCase: ChangeMenuItemPriceUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a menu item' })
  @ApiCreatedResponse({
    description: 'Menu item created successfully',
    schema: {
      example: MenuItemApiExamples.createdResponse,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
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
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Duplicate SKU',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 409,
        message: "Menu item SKU 'IZGARA-KOFTE-01' already exists",
        code: 'CONFLICT',
      },
    },
  })
  async create(@Body() body: CreateMenuItemRequestDto): Promise<MenuItemResponseDto> {
    const result = await this.createMenuItemUseCase.execute(
      MenuItemPresentationMapper.toCreateCommand(body),
    );

    return MenuItemPresentationMapper.toResponse(result);
  }

  @Get()
  @ApiOperation({ summary: 'List menu items for the current restaurant' })
  @ApiOkResponse({
    description: 'Menu items retrieved successfully',
    schema: {
      example: MenuItemApiExamples.listResponse,
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async list(@Query() query: ListMenuItemsQueryDto): Promise<MenuItemResponseDto[]> {
    const results = await this.listMenuItemsUseCase.execute(
      MenuItemPresentationMapper.toListQuery(query),
    );

    return MenuItemPresentationMapper.toResponseList(results);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu item by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({
    description: 'Menu item retrieved successfully',
    schema: {
      example: {
        ...MenuItemApiExamples.successEnvelope,
        data: MenuItemApiExamples.item,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Menu item not found',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 404,
        message: "MenuItem with id '550e8400-e29b-41d4-a716-446655440000' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<MenuItemResponseDto> {
    const result = await this.getMenuItemUseCase.execute(
      MenuItemPresentationMapper.toGetQuery(id),
    );

    return MenuItemPresentationMapper.toResponse(result);
  }

  @Post(':menuItemId/categories')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Attach a menu item to a category' })
  @ApiParam({ name: 'menuItemId', format: 'uuid' })
  @ApiCreatedResponse({
    description: 'Menu item attached to category successfully',
    schema: {
      example: MenuItemApiExamples.attachResponse,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 400,
        message: 'Validation failed',
        code: 'BAD_REQUEST',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Category or menu item not found',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 404,
        message: "MenuItem with id '550e8400-e29b-41d4-a716-446655440000' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async attachToCategory(
    @Param('menuItemId', ParseUUIDPipe) menuItemId: string,
    @Body() body: AttachMenuItemToCategoryRequestDto,
  ): Promise<AttachMenuItemToCategoryResponseDto> {
    const result = await this.attachMenuItemToCategoryUseCase.execute(
      MenuItemPresentationMapper.toAttachCommand(menuItemId, body),
    );

    return MenuItemPresentationMapper.toAttachResponse(result);
  }

  @Patch(':menuItemId/price')
  @ApiOperation({ summary: 'Change the base price of a menu item' })
  @ApiParam({ name: 'menuItemId', format: 'uuid' })
  @ApiOkResponse({
    description: 'Menu item price changed successfully',
    schema: {
      example: MenuItemApiExamples.priceChangeResponse,
    },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 400,
        message: 'Validation failed',
        code: 'BAD_REQUEST',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Menu item not found',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 404,
        message: "MenuItem with id '550e8400-e29b-41d4-a716-446655440000' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...MenuItemApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async changePrice(
    @Param('menuItemId', ParseUUIDPipe) menuItemId: string,
    @Body() body: ChangeMenuItemPriceRequestDto,
  ): Promise<ChangeMenuItemPriceResponseDto> {
    const result = await this.changeMenuItemPriceUseCase.execute(
      MenuItemPresentationMapper.toChangePriceCommand(menuItemId, body),
    );

    return MenuItemPresentationMapper.toPriceChangeResponse(result);
  }
}
