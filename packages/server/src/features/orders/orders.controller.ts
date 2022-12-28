import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDTO } from './dto/create-order.dto';
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
}
