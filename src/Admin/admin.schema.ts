/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Admin extends Document{
    
    @Prop({required: true})
    firstName: string

    @Prop({required: true})
    lastName: string

    @Prop({unique: true, required: true })
    userName: string

    @Prop({required: true})
    password: string

    @Prop({ unique: true, required: true })
    mobileNo : number

    @Prop({ unique: true, required: true })
    email: string

    @Prop({required: true})
    gender: string

    @Prop()
    isAdmin: boolean
}
export const AdminSchema = SchemaFactory.createForClass(Admin)

