import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);

  //to enable validation pipes globally
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(4000);
  logger.log('Applicatiom running on port 4000')
}
bootstrap();
