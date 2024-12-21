import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // const regex = /\d+/;
  // const str = '123abc';

  // console.log('');
  // console.log(str.matchAll(regex));
  // console.log('');

  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap();
