import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from 'src/shared/repository/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/shared/schema/product.schema';

@Module({
  controllers: [ProductController],
  providers: [ProductService,ProductRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema
      },
    ])
  ]
})
export class ProductModule {}
