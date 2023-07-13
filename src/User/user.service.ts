/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { userDto } from './dto/user.dto';
import { userLoginDto } from './dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class userService {
  constructor(
    @InjectModel("User")
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  
  async registerNewuser(userDto: userDto): Promise<User | object> {
    const {
      firstName,
      lastName,
      username,
      password,
      email,
      mobileNo,
      gender,
    } = userDto;
    
    const existingUser = await this.userModel.findOne({username, email})
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    if(!existingUser){
      const newUser = await  this.userModel.create({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        email,
        mobileNo,
        gender,
      });
      return {
        statusCode: 201,
        message: "user registered successfully",
        User: newUser
       }
    }
    else{
      return {
        statusCode: 400,
        message: 'User Already Exist',
      }
    }
  }

  async signInUser(userLoginDto: userLoginDto): Promise<object> {
    const { username, password } = userLoginDto;
    const user = await this.userModel.findOne( { username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payLoad = { username };
      const accessToken = await this.jwtService.sign(payLoad);
      return { 
        statusCode: 200,
        message: 'Login Successfull',
        User: user,
        token: accessToken,
       };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
