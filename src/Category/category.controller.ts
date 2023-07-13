/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { categoryDto } from './dto/category.dto';
import { categoryService } from './category.service';
import { Category } from './category.schema';
import { AuthGuard } from 'src/Admin/authGuard';

@Controller('/category')
@UseGuards(AuthGuard)
export class categoryController {
  constructor(private categoryService: categoryService) {}
  
  @Post('/add')
 createProductCategory(@Body() categoryDto: categoryDto): Promise<Category | string> {
    return this.categoryService.createCategory(categoryDto)
  }

}