import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import CreateProductCommand from "./create-product.command";
import { ProductRepository } from "src/infrastructure/repository/product.repository";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateProductCommand)
export default class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(command: CreateProductCommand): Promise<unknown> {
        const body = command.body;

        // check same name product
        const isProductExists = await this.productRepository.findOneByClause({
            name: body.name
        });
        if (isProductExists) {
            throw new BadRequestException("Product With Same Name Exists");
        }

        // create product
        await this.productRepository.createProduct(body);
        return;
    }
}
