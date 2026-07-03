import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { OrderStatus } from '../../../domain/enums/order-status.enum';

export class ListOrdersQueryDto {
  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiPropertyOptional({ enum: OrderStatus, example: OrderStatus.OPEN })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
