import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/common/types/order-status';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UsersService,
  ) {}

  async getAllOrders(): Promise<Order[] | null> {
    return this.orderRepository.find();
  }

  async createOrder(orderDTO: Partial<Order>, clientId: string) {
    const client = await this.userService.findById(clientId);
    const order = Object.assign(new Order(), orderDTO);
    order.client = client;
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.orderRepository.update(orderId, { status });
  }
}
