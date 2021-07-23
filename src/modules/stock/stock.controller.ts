import { Controller, Get, UseGuards } from "@nestjs/common";
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
}
