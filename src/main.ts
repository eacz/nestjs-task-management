import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //to enable validation pipes globally
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(4000);
}
bootstrap();
