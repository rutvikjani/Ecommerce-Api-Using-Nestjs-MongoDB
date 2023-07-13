/* eslint-disable prettier/prettier */
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { productService } from './product.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from '../Admin/admin.module';
import { CategoryModule } from '../Category/categroy.module';
import { Category, CategorySchema } from 'src/Category/category.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    CategoryModule,
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
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
    MulterModule.register({
      dest: './upload'
    })
  ],
  providers: [productService,],
  controllers: [productController],
  exports: [productService],
})
export class ProductModule {}
