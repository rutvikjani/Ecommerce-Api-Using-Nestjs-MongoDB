import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './Admin/admin.module';
import { UserModule } from './User/user.module';
import { ProductModule } from './Product/product.module';
import { CategoryModule } from './Category/categroy.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { fileUploadModule } from './File Upload/fileUpload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env}`],
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ecommerce-api'),
    AdminModule,
    UserModule,
    ProductModule,
    CategoryModule,
    fileUploadModule,
  ],
  providers: [],
})
export class AppModule {}
