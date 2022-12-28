import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/common/types/order-status';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
