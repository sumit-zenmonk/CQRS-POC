import { Body, Controller, Get, Query, } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import GetProductLisintgQuery from "./get-product-listing.query";

@Controller()
export class GetProductLisintgController {
    constructor(private readonly queryBus: QueryBus) { }

    @Get()
    async getProductLisintg(@Query('page') page: number) {
        const getProductLisintgQuery = new GetProductLisintgQuery(page);
        const data = await this.queryBus.execute(getProductLisintgQuery);

        return {
            data: data,
            message: "Product Fetched Success"
        }
    }
}
