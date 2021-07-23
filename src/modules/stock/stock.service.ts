import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderDto } from "./dto/order.dto";
import { StockHandler } from "./handlers/stock-handler.service";
import { StockModel } from "./handlers/stock.model";
import { Stock, StockDocument } from "./stock.schema";

@Injectable()
export class StockService {
    private stockHandlers: Map<string, StockHandler>;
    constructor(
        @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
    ) {
        this.stockHandlers = new Map<string, StockHandler>();
    }

    async getAll(): Promise<Stock[]> {
        return this.stockModel.find().exec();
    }

    async getStock(stockName: string): Promise<Stock> {
        return this.stockModel.findOne({ name: stockName }).exec();
    }

    async submitBuyOrder(buyOrderDto: OrderDto): Promise<string> {
        const stockName = buyOrderDto.name;
        var handler = this.stockHandlers.get(stockName);
        if (!handler) {
            handler = new StockHandler();
            this.stockHandlers.set(stockName, handler);
        }

        const buyOrder: StockModel = {
            volume: buyOrderDto.volume,
            bidPrice: buyOrderDto.bidPrice,
        };
        return handler.addBuyOrder(buyOrder);
    }

    async submitSellOrder(sellOrderDto: OrderDto): Promise<string> {
        const stockName = sellOrderDto.name;
        var handler = this.stockHandlers.get(stockName);
        if (!handler) {
            handler = new StockHandler();
            this.stockHandlers.set(stockName, handler);
        }

        const sellOrder: StockModel = {
            volume: sellOrderDto.volume,
            bidPrice: sellOrderDto.bidPrice,
        };
        return handler.addSellOrder(sellOrder);
    }
}
