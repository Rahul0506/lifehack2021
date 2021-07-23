import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stock, StockDocument } from "./stock.schema";

@Injectable()
export class StockService {
    constructor(
        @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
    ) {}

    async getAll(): Promise<Stock[]> {
        return this.stockModel.find().exec();
    }

    async getStock(stockName: string): Promise<Stock> {
        return this.stockModel.findOne({ name: stockName }).exec();
    }
}
