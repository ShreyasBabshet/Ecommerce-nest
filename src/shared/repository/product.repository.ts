import { Model } from "mongoose";
import { Users } from "../schema/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Product } from "../schema/product.schema";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { }

    async findOne(query: any) {
        return this.productModel.findOne(query);
    }
    async create(data: Record<string, any>) {
        return await this.productModel.create(data);
    }
    async updateOne(query: any, data: Record<string, any>) {
        return await this.productModel.updateOne(query.data);
    }
    async findAll(query?: any) {
        return await this.productModel.find(query);
    }
}