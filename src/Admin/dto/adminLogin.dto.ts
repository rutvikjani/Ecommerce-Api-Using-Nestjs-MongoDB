/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class adminLoginDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

}