/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { userService } from './user.service';
import { User } from './user.schema';
import { userDto } from './dto/user.dto';
import { userLoginDto } from './dto/userLogin.dto';

@Controller('user')
export class userController {
  constructor(private userService: userService) {
  }

  @Post('/register')
  async newUser(@Body() adminDto: userDto): Promise<User | object> {
    return this.userService.registerNewuser(adminDto);
  }

  @Post('/login')
  async signInUser(@Body() userLoginDto: userLoginDto): Promise<object>{
   return this.userService.signInUser(userLoginDto);
  }
}
