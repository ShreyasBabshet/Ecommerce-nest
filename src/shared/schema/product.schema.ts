import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";
import { timeStamp } from "console";
import {
    Document
} from "mongoose";

export enum userTypes {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}
@Schema({
    timestamps: true
})
export class Product extends Document {
    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    qty: string;
    
    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)