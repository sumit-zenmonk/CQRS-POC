import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import UpdateProductService from "./update-product.handler";
import { UpdateProductDto } from "./update-product.dto";

@Controller()
export class UpdateProductController {
    constructor(
        private readonly updateProductService: UpdateProductService,
    ) { }

    @Patch('/:product_uuid')
    async updateProduct(@Param('product_uuid') product_uuid: string, @Body() body: UpdateProductDto) {
        await this.updateProductService.handle(product_uuid, body);

        return {
            message: "Product Updated Success"
        };
    }
}