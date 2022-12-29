import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    allowedHeaders: '*',
    origin: ['http://localhost:3000'],
    methods: '*',
  });
  await app.listen(8080);
}

bootstrap();
