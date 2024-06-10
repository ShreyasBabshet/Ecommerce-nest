import { SchemaFactory,Schema, Prop } from "@nestjs/mongoose";
import { timeStamp } from "console";
import {
    Document
} from "mongoose";

export enum userTypes{
    ADMIN = 'admin',
    CUSTOMER='customer'
}
@Schema({
    timestamps: true
})
export class Users extends Document{ 
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    password: string;

    @Prop({ required: true,enum:[userTypes.ADMIN,userTypes.CUSTOMER] })
    type: string;

    @Prop({ default: false })
    isVerified?: boolean;

    @Prop({ default: false })
    otp: string;

    @Prop({ default: null })
    otpExpiryTime: Date;
}

export const UserSchema=SchemaFactory.createForClass(Users)