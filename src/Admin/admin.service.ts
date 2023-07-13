/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from './admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { adminDto } from './dto/admin.dto';
import { JwtService } from '@nestjs/jwt';
import { adminLoginDto } from './dto/adminLogin.dto';

@Injectable()
export class adminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,
    private jwtService: JwtService,
  ) {}

  async newAdmin(adminDto: adminDto): Promise<Admin | object> {
    const {
      firstName,
      lastName,
      userName,
      password,
      email,
      mobileNo,
      gender,
      isAdmin,
    } = adminDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await this.adminModel.findOne({
      userName,
      email,
    });
    if (!existingUser) {
      const adminUser = await this.adminModel.create({
        firstName,
        lastName,
        userName,
        password: hashedPassword,
        email,
        mobileNo,
        gender,
        isAdmin: true,
      });
      return adminUser.save();
    } else {
      return {
        statusCode: 400,
        message: `User already exist.`,
      };
    }
  }

  async loginAdmin(adminLoginDto: adminLoginDto): Promise<object> {
    const { userName, password } = adminLoginDto;
    const admin = await this.adminModel.findOne({ userName });
    const isAdmin = admin.isAdmin;
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { userName, isAdmin };
      const accessToken = await this.jwtService.sign(payload);
      return {
        statusCode: 200,
        message: 'Login Successfull',
        Admin: admin,
        token: accessToken,
      };
    } else {
      throw new UnauthorizedException('User is not authorized');
    }
  }
}
