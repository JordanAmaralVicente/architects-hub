import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index() {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createOrder(@Body() createOrderDTO: CreateOrderDTO) {
    const { clientId, ...order } = createOrderDTO;
    return this.ordersService.createOrder(order, clientId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDTO: UpdateOrderDTO,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderDTO.status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
