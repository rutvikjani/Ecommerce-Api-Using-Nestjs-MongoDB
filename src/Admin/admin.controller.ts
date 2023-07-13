/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { adminService } from './admin.service';
import { Admin } from './admin.schema';
import { adminDto } from './dto/admin.dto';
import { adminLoginDto } from './dto/adminLogin.dto';

@Controller('admin')
export class adminController {

  constructor(
    private adminService: adminService, 
    ) {}

  @Post('/register')
  async newAdmin(@Body() adminDto: adminDto): Promise<Admin | object> {
    return this.adminService.newAdmin(adminDto);
  }

  @Post('/login')
  async loginAdmin(@Body() adminLoginDto: adminLoginDto): Promise<object>{
   return this.adminService.loginAdmin(adminLoginDto);
  }
}