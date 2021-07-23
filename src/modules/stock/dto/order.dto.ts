import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
    @ApiProperty({
        required: true,
    })
    name: string;

    @ApiProperty({
        required: true,
    })
    volume: number;

    @ApiProperty({
        required: true,
    })
    bidPrice: number;
}
