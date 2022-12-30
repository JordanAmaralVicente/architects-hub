import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from 'src/common/types/order-status';
import { IsNull, Repository } from 'typeorm';
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

  async createOrder(
    orderDTO: Partial<Order>,
    clientId: string,
    architectId: string,
  ) {
    const client = await this.userService.findById(clientId);
    const architect = await this.userService.findById(architectId);

    const order = this.mountOrderObject(orderDTO, client, architect);
    return this.orderRepository.save(order);
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.orderRepository.update(orderId, { status });
  }

  async deleteOrder(orderId: string) {
    return this.orderRepository.softDelete(orderId);
  }

  async getArchitectOrders(architectId: string) {
    return this.orderRepository.find({
      where: {
        architect: {
          id: architectId,
        },
        deletedAt: IsNull(),
      },
    });
  }

  async getClientOrders(clientId: string) {
    return this.orderRepository.find({
      where: {
        client: {
          id: clientId,
        },
        deletedAt: IsNull(),
      },
    });
  }

  private mountOrderObject(
    orderDTO: Partial<Order>,
    client: User,
    architect: User,
  ) {
    const order = Object.assign(new Order(), orderDTO);
    order.client = client;
    order.architect = architect;
    return order;
  }
}
