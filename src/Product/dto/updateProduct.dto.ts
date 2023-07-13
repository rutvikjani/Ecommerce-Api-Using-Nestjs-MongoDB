/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class updateProductDto {

  @IsString()
  @IsNotEmpty()
  productDescription: string

}
