import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';
import { AllExceptionFilter } from './httpExceptionFilter';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import express from 'express';
import { join } from 'path';
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://shreyasbabshet:admin@ecommerce.yvp8rtk.mongodb.net/?retryWrites=true&w=majority"),
    UsersModule,
    CategoryModule,
    ProductModule,
    MulterModule.register({
      dest: './uploads', // Specify the directory where uploaded files will be stored
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionFilter
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(express.static(join(__dirname, '..', 'uploads')))
      .forRoutes('/uploads');
  }
}
