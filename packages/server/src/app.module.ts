import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './features/auth/auth.module';
import { OrdersModule } from './features/orders/orders.module';
import { UsersModule } from './features/users/users.module';

console.log(__dirname + 'database/');

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
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: false,
      migrations: [__dirname + '/database/migrations/*.{ts,js}'],
      migrationsRun: true,
      logging: true,
      migrationsTableName: 'migrations',
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
