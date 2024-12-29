import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
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
  const logger = new Logger();
  app.setGlobalPrefix('api');
  const port = 5000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
