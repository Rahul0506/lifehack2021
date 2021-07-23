import { Injectable } from "@nestjs/common";
import PriorityQueue from "ts-priority-queue";
import { StockModel } from "./stock.model";

@Injectable()
export class StockHandler {
    private buyQueue: PriorityQueue<StockModel>;
    private sellQueue: PriorityQueue<StockModel>;

    constructor() {
        const stockComparator = function (stk1, stk2) {
            return stk1.bidPrice - stk2.bidPrice;
        };
        this.buyQueue = new PriorityQueue<StockModel>({
            comparator: stockComparator,
        });
        this.sellQueue = new PriorityQueue<StockModel>({
            comparator: stockComparator,
        });
    }

    async addBuyOrder(buyOrder: StockModel): Promise<string> {
        this.buyQueue.queue(buyOrder);
        return "done bro";
    }

    async addSellOrder(sellOrder: StockModel): Promise<string> {
        this.sellQueue.queue(sellOrder);
        return "done bro";
    }
}
