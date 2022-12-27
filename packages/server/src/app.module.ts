import { Module } from '@nestjs/common';
import { OrdersModule } from './features/orders/orders.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [UsersModule, OrdersModule],
})
export class AppModule {}
