import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductDto } from "./create-product.dto";
import { CommandBus } from "@nestjs/cqrs";
import CreateProductCommand from "./create-product.command";

@Controller()
export class CreateProductController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    async createProduct(@Body() body: CreateProductDto) {
        const createProductCommand = new CreateProductCommand(body);
        await this.commandBus.execute(createProductCommand);

        return {
            message: "Product Created Success"
        }
    }
}
