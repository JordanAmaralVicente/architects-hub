import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/common/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.typeorm.host,
      port: databaseConfig.typeorm.port,
      username: databaseConfig.typeorm.username,
      password: databaseConfig.typeorm.password,
      database: databaseConfig.typeorm.database,
      synchronize: databaseConfig.typeorm.synchronize,
    }),
  ],
})
export class CustomTypeOrmModule {}
