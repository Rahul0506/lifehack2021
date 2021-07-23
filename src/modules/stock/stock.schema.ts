import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
    @Prop({
        index: true,
    })
    name: string;

    @Prop()
    price: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
