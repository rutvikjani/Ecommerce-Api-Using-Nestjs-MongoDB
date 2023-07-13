/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { productDto } from './dto/product.dto';
import { Model } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class productService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async addNewProduct(productDto: productDto): Promise<object> {
    const { productName, productDescription, brand, price, category } = productDto;
    await this.productModel.create({
      productName,
      productDescription,
      brand,
      price,
      category,
    });
    return {
      statusCode: 201,
      message: 'Product Created Successfully',
      };  
  }

  async getProducts(): Promise<Product[]> {
    return await this.productModel.find().populate('category');
  }

  async deleteProduct(id: string): Promise<object> {
    await this.productModel.findByIdAndDelete(id);
    return {
      statusCode: 200,
      message: `Your product with id : "${id}" deleted successfully`,
    };
  }

  async updateProduct(id: string, data): Promise<object> {
    const updateProduct = await this.productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      statusCode: 200,
      message: 'Your Product is updated Successfully',
    };
  }

  // async uploadingFiles(file: Express.Multer.File): Promise<any> {
  //   console.log(file)
  // }
}
