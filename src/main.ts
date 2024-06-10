import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import cookieParser from 'cookie-parser';
import * as express from 'express';
import { TransformationInterceptor } from './responseInterceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.json())
  app.use(cookieParser())
  app.useGlobalInterceptors(new TransformationInterceptor())
  await app.listen(config.get('port'), () => {
    return console.log(`Server is running on port ${config.get('port')}`)
  });
}
bootstrap();
