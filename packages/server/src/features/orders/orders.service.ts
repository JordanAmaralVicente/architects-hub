import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/common/types/order-status';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
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
    const order = this.mountOrderObject(orderDTO, client);
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.orderRepository.update(orderId, { status });
  }

  private mountOrderObject(orderDTO: Partial<Order>, client: User) {
    const order = Object.assign(new Order(), orderDTO);
    order.client = client;
    return order;
  }
}
