import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../domain/enums/order-status.enum';

export class ChangeOrderStatusRequestDto {
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.IN_KITCHEN })
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
