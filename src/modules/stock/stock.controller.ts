import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrderDto } from "./dto/order.dto";
import { Stock } from "./stock.schema";
import { StockService } from "./stock.service";

@ApiBearerAuth()
@ApiTags("stock")
@Controller("stock")
export class StockController {
    constructor(private readonly stockService: StockService) {}

    /**
     * Retrieves all available stocks
     * @returns {Promise<Stock[]>} all stocks in database
     */
    @Get("all")
    @ApiResponse({
        status: 200,
        description: "Fetch all stocks request received",
    })
    async getAllStocks(): Promise<Stock[]> {
        return this.stockService.getAll();
    }

    /**
     * Retrieves data for a stock
     * @param stockName name of the stock to fetch details for
     * @returns {Promise<Stock>} stock requested for
     */
    @Get(":stockName")
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

    /**
     * Submits a buy order for a stock, with given bid and volume
     * @param buyOrderDto json body with order fields
     */
    @Post("buy")
    @ApiResponse({
        status: 201,
        description: "Buy order submission received",
    })
    @ApiResponse({
        status: 400,
        description: "Buy order submission failed",
    })
    async submitBuyOrder(@Body() buyOrderDto: OrderDto) {
        const stock = await this.stockService.getStock(buyOrderDto.name);
        if (!stock) {
            throw new BadRequestException("No stocks with given name exist.");
        }
        return this.stockService.submitBuyOrder(buyOrderDto);
    }

    /**
     * Submits a sell order for a stock, with given bid and volume
     * @param buyOrderDto json body with order fields
     */
    @Post("sell")
    @ApiResponse({
        status: 201,
        description: "Sell order submission received",
    })
    @ApiResponse({
        status: 400,
        description: "Sell order submission failed",
    })
    async submitSellOrder(@Body() sellOrderDto: OrderDto) {
        const stock = await this.stockService.getStock(sellOrderDto.name);
        if (!stock) {
            throw new BadRequestException("No stocks with given name exist.");
        }
        return this.stockService.submitSellOrder(sellOrderDto);
    }
}
