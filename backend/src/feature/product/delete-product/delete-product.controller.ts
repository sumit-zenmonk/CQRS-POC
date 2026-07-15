import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import DeleteProductCommand from "./delete-product.command";

@Controller()
export class DeleteProductController {
    constructor(private readonly commandBus: CommandBus) { }

    @Delete('/:product_uuid')
    async deleteProduct(@Param('product_uuid') product_uuid: string) {
        const deleteProductCommand = new DeleteProductCommand(product_uuid);
        await this.commandBus.execute(deleteProductCommand);

        return {
            message: "Product Deleted Success"
        }
    }
}
