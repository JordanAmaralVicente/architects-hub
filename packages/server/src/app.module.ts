import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './features/auth/auth.module';
import { OrdersModule } from './features/orders/orders.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    AuthModule,
    OrdersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'architect_admin',
      database: 'architect_hub',
      entities: ['dist/**/*.entity.ts'],
      synchronize: false,
      migrations: ['dist/database/migrations/*.{js,ts}'],
      migrationsRun: true,
      logging: true,
      migrationsTableName: 'migrations',
    }),
  ],
})
export class AppModule {}
