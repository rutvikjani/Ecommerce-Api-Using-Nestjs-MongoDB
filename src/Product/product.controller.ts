/* eslint-disable prettier/prettier */
import { productDto } from './dto/product.dto';
import { productService } from './product.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '../Admin/authGuard';
import { updateProductDto } from './dto/updateProduct.dto';

@UseGuards(AuthGuard)
@Controller('product')
export class productController {
  constructor(private productService: productService) {}
  
  @Post('/add')
  async newProduct(@Body() productDto: productDto): Promise<object> {
    return await this.productService.addNewProduct(productDto);
  }
  
  @Get()
  searchAllProduct() {
    return this.productService.getProducts();
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): Promise<object> {
    return this.productService.deleteProduct(id);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: updateProductDto,
  ): Promise<object> {
    return this.productService.updateProduct(id, updateProductDto);
  }


}
