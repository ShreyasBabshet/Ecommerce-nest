import { Model } from "mongoose";
import { Category } from "../schema/category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) { }

    async findOne(query: any) {
        return this.categoryModel.findOne(query);
    }
    async create(data: Record<string, any>) {
        return await this.categoryModel.create(data);
    }
    async updateOne(query: any, data: Record<string, any>) {
        return await this.categoryModel.updateOne(query.data);
    }
    async findAll(query?: any) {
        return await this.categoryModel.find(query);
    }
}