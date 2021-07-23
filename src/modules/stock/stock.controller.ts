import {
    BadRequestException,
    Controller,
    Get,
    Param,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Stock } from "./stock.schema";
import { StockService } from "./stock.service";

@ApiBearerAuth()
@ApiTags("stock")
@Controller("stock")
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get("all")
    @UseGuards(AuthGuard("jwt"))
    @ApiResponse({
        status: 200,
        description: "Fetch all stocks request received",
    })
    async getAllStocks(): Promise<Stock[]> {
        return this.stockService.getAll();
    }

    @Get(":stockName")
    @UseGuards(AuthGuard("jwt"))
    @ApiResponse({
        status: 200,
        description: "Fetch stock details request received ",
    })
    @ApiResponse({
        status: 400,
        description: "Fetch stock details request failed.",
    })
    async getStockByName(
        @Param("stockName") stockName: string,
    ): Promise<Stock> {
        const stock = await this.stockService.getStock(stockName);
        if (!stock) {
            throw new BadRequestException("No stocks with given name exist.");
        }
        return stock;
    }
}
