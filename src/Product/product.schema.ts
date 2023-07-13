/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from '../Category/category.schema';


@Schema()
export class Product extends Document{
  
  @Prop()
  productName: string;

  @Prop()
  productDescription: string;

  @Prop()
  brand: string;

  @Prop()
  price: number;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true})
  category: mongoose.Schema.Types.ObjectId | Category
}

export const ProductSchema = SchemaFactory.createForClass(Product);