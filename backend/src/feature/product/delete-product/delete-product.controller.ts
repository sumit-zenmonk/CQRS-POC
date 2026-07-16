import { Body, Controller, Delete, Param, Post, Req } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import DeleteProductCommand from "./delete-product.command";
import type { Request } from "express";

@Controller()
export class DeleteProductController {
    constructor(private readonly commandBus: CommandBus) { }

    @Delete('/:product_uuid')
    async deleteProduct(@Param('product_uuid') product_uuid: string, @Req() req: Request) {
        const deleteProductCommand = new DeleteProductCommand(product_uuid, req.user.uuid);
        await this.commandBus.execute(deleteProductCommand);

        return {
            message: "Product Deleted Success"
        }
    }
}
