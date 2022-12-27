import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from './database/typeorm/typeorm.module';
import { OrdersModule } from './features/orders/orders.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [CustomTypeOrmModule, OrdersModule, UsersModule],
})
export class AppModule {}
