import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule);
  //enable cors
  //TODO: configure allowed origins
  app.enableCors()

  //to enable validation pipes globally
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT);
  
  logger.log(`Application running on port ${process.env.PORT}`)
}
bootstrap();
