import { Model } from "mongoose";
import { Users } from "../schema/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) { }

    async findOne(query: any) {
        return this.userModel.findOne(query);
    }

    async create(data: Record<string, any>) {
        return await this.userModel.create(data);
    }
    async updateOne(query: any, data: Record<string, any>) {
        return await this.userModel.updateOne(query.data);
    }
    async findAll(query: any) {
        return await this.userModel.find(query);
    }
}