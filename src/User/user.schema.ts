/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class User extends Document{
    
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({unique: true, required: true})
    mobileNo : number

    @Prop({required: true, unique: true, index: true})
    email: string

    @Prop()
    gender: string

}

export const UserSchema = SchemaFactory.createForClass(User)
