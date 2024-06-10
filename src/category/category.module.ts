import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from 'src/shared/repository/category.repository';
import { Mongoose } from 'mongoose';
import { Category, CategorySchema } from 'src/shared/schema/category.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      },
    ])
  ]
})
export class CategoryModule { }
