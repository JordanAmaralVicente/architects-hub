import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Order } from './order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order]), UsersModule],
})
export class OrdersModule {}
