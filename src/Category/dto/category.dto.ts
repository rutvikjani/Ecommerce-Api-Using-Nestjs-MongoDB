/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class categoryDto {
  @IsNotEmpty()
  @IsString()
  productCategory: string;
}
