/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { categoryDto } from './dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';

@Injectable()
export class categoryService {
  constructor(
    @InjectModel(Category.name)
    private categorymodel: Model<Category> ,
  ) {}

  async createCategory(categoryDto: categoryDto): Promise<Category | string> {
    const { productCategory } = categoryDto;
      const createCategory = this.categorymodel.create({
          productCategory,
      })
      return createCategory
  }
}
