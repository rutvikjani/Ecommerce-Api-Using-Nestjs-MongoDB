/* eslint-disable prettier/prettier */
import { MinLength, IsString, IsNotEmpty } from 'class-validator';
import { Category } from 'src/Category/category.schema';

export class productDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  productDescription: string
  
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  category: string | Category;
}
