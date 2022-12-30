import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/common/types/order-status';

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
