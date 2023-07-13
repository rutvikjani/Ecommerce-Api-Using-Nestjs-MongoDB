/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.schema';
import { Module } from '@nestjs/common';
import { categoryController } from './category.controller';
import { categoryService } from './category.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { adminService } from 'src/Admin/admin.service';
import { AuthGuard } from 'src/Admin/authGuard';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AdminModule } from 'src/Admin/admin.module';

@Module({
  imports: [
  AdminModule,
  MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('secretKey'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
],
  providers: [categoryService],
  controllers: [categoryController],
  exports: [categoryService]
})
export class CategoryModule {}