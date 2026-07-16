import { Command } from "@nestjs/cqrs";
import { CreateProductDto } from "./create-product.dto";

export default class CreateProductCommand extends Command<unknown> {
    constructor(
        readonly body: CreateProductDto,
        readonly user_uuid: string,
    ) {
        super();
    }
}