import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import CreateProductCommand from "./create-product.command";
import { ProductRepository } from "src/infrastructure/repository/product.repository";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateProductCommand)
export default class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        private readonly repository: ProductRepository,
    ) { }

    async execute(command: CreateProductCommand): Promise<unknown> {
        const { body, user_uuid } = command;

        // check same name product
        const isProductExists = await this.repository.findOneByWhereClause({
            name: body.name
        });
        if (isProductExists) {
            throw new BadRequestException("Product With Same Name Exists");
        }

        // create product
        await this.repository.createProduct({
            name: body.name,
            description: body.description,
            price: body.price,
            image_url: body.image_url,
            user_uuid: user_uuid,
        });
        return;
    }
}
