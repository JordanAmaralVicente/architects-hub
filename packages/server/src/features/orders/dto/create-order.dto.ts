import { IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  architectId: string;
}
