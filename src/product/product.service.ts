import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ProductRepository } from 'src/shared/repository/product.repository';
@Injectable()
export class ProductService {
  constructor(@Inject(ProductRepository) private readonly productDb: ProductRepository) { }

  async create(image: any, createProductDto: CreateProductDto, req: any) {
    try {
      const uploadsDirectory = path.join(__dirname, '..', 'uploads');
      await fs.promises.mkdir(uploadsDirectory, { recursive: true });
      const uploadedImagePath = path.join(uploadsDirectory, image.originalname);
      await fs.promises.writeFile(uploadedImagePath, image.buffer);

      // Get the base URL from the request object
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const newProduct = {
        productName: createProductDto.productName,
        price: createProductDto.price,
        qty: createProductDto.qty,
        rating: createProductDto.rating,
        imageUrl: `${baseUrl}/uploads/${image.originalname}`, // Construct the full URL
      };

      const product = await this.productDb.create(newProduct);

      return {
        success: true,
        message: 'New Category Created',
        result: product,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    try {
      const categories = await this.productDb.findAll();
      return {
        success: true,
        message: 'New Category Created',
        result: categories
      }
    }
    catch (e) {
      throw new Error(e)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
