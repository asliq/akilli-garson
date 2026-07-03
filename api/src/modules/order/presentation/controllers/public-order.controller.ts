import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { OrderApiExamples } from '../constants/order-api.examples';
import { CreatePublicOrderRequestDto } from '../dto/requests/create-public-order.request.dto';
import { PublicOrderResponseDto } from '../dto/responses/order.response.dto';
import { OrderPresentationMapper } from '../mappers/order.presentation.mapper';

@ApiTags('Public Orders')
@Controller('public/orders')
export class PublicOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an order from QR table token (no authentication required)' })
  @ApiCreatedResponse({
    description: 'Order created successfully',
    schema: { example: OrderApiExamples.createdResponse },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or item not orderable',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 400,
        message: 'Menu item is not available for ordering',
        code: 'MENU_ITEM_NOT_ORDERABLE',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Table or menu item not found',
    schema: {
      example: {
        ...OrderApiExamples.errorEnvelope,
        statusCode: 404,
        message: "Table with id 'qr-abc123' not found",
        code: 'NOT_FOUND',
      },
    },
  })
  async create(@Body() body: CreatePublicOrderRequestDto): Promise<PublicOrderResponseDto> {
    const result = await this.createOrderUseCase.execute(
      OrderPresentationMapper.toCreateCommand(body),
    );

    return OrderPresentationMapper.toPublicResponse(result);
  }
}
