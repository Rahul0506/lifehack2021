import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { Stock, StockSchema } from "./stock.schema";
import { StockService } from "./stock.service";
import { StockController } from "./stock.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  providers: [StockService],
  controllers: [StockController],
})
export class StockModule {}
