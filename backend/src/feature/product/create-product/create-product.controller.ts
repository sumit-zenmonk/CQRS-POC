import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateProductDto } from "./create-product.dto";
import { CommandBus } from "@nestjs/cqrs";
import CreateProductCommand from "./create-product.command";
import type { Request } from "express";

@Controller()
export class CreateProductController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    async createProduct(@Body() body: CreateProductDto, @Req() req: Request) {
        const createProductCommand = new CreateProductCommand(body, req.user.uuid);
        await this.commandBus.execute(createProductCommand);

        return {
            message: "Product Created Success"
        }
    }
}
