import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ChangeOrderStatusUseCase } from '../../application/use-cases/change-order-status.use-case';
import { GetOrderUseCase } from '../../application/use-cases/get-order.use-case';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case';
import { OrderApiExamples } from '../constants/order-api.examples';
import { ChangeOrderStatusRequestDto } from '../dto/requests/change-order-status.request.dto';
import { ListOrdersQueryDto } from '../dto/requests/list-orders.query.dto';
import { OrderResponseDto } from '../dto/responses/order.response.dto';
import { OrderPresentationMapper } from '../mappers/order.presentation.mapper';

@ApiTags('Orders')
@ApiSecurity('restaurant-id')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly listOrdersUseCase: ListOrdersUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List orders for the current restaurant' })
  @ApiOkResponse({
    description: 'Orders retrieved successfully',
    schema: { example: OrderApiExamples.listResponse },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async list(@Query() query: ListOrdersQueryDto): Promise<OrderResponseDto[]> {
    const results = await this.listOrdersUseCase.execute(
      OrderPresentationMapper.toListQuery(query),
    );

    return OrderPresentationMapper.toResponseList(results);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({
    description: 'Order retrieved successfully',
    schema: {
      example: {
        ...OrderApiExamples.successEnvelope,
        data: OrderApiExamples.order,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 404,
        message: "Order with id '550e8400-e29b-41d4-a716-446655440000' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<OrderResponseDto> {
    const result = await this.getOrderUseCase.execute(OrderPresentationMapper.toGetQuery(id));

    return OrderPresentationMapper.toResponse(result);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change order status' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({
    description: 'Order status updated successfully',
    schema: {
      example: {
        ...OrderApiExamples.successEnvelope,
        data: OrderApiExamples.order,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid status transition',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 400,
        message: "Cannot transition order from 'open' to 'closed'",
        code: 'ORDER_INVALID_STATUS_TRANSITION',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 404,
        message: "Order with id '550e8400-e29b-41d4-a716-446655440000' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing X-Restaurant-Id header',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 401,
        message: 'Restaurant context is required',
        code: 'TENANT_CONTEXT_REQUIRED',
      },
    },
  })
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ChangeOrderStatusRequestDto,
  ): Promise<OrderResponseDto> {
    const result = await this.changeOrderStatusUseCase.execute(
      OrderPresentationMapper.toChangeStatusCommand(id, body),
    );

    return OrderPresentationMapper.toResponse(result);
  }
}
