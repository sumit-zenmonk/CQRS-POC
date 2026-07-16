import { Controller, Get, Param } from "@nestjs/common";
import GetProductByUuidService from "./get-product-by-uuid.handler";

@Controller()
export class GetProductByUuidController {
    constructor(
        private readonly getProductByUuidService: GetProductByUuidService,
    ) { }

    @Get('/:product_uuid')
    async getProductByUuid(@Param('product_uuid') product_uuid: string) {
        const product = await this.getProductByUuidService.handle(product_uuid);

        return {
            data: product,
            message: "Product Fetched Success"
        };
    }
}