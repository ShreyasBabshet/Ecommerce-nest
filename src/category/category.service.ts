import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from 'src/shared/repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(@Inject(CategoryRepository) private readonly categoryDb: CategoryRepository) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      if (!createCategoryDto.name) {
        throw new Error('Name Not found')
      }

      const category = await this.categoryDb.create({
        ...createCategoryDto
      });
      return {
        success: true,
        message: 'New Category Created',
        result: { category }
      }
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryDb.findAll()
      return {
        success: true,
        message: 'New Category Created',
        result: categories
      }
    }
    catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: number) {
    const category = await this.categoryDb.findOne(id);
    return {
      success: true,
      message: 'New Category Created',
      result: category
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
