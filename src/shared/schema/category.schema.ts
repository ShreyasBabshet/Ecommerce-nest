import { SchemaFactory, Schema, Prop } from "@nestjs/mongoose";

import {
    Document
} from "mongoose";

@Schema({
    timestamps: true
})
export class Category extends Document {
    @Prop({ required: true })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)