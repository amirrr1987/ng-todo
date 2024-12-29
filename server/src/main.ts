import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');
  await app.listen(5000);
}

bootstrap();
