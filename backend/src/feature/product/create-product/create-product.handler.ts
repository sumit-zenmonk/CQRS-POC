import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import CreateProductCommand from "./create-product.command";
import { ProductRepository } from "src/infrastructure/repository/product.repository";

@CommandHandler(CreateProductCommand)
export default class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(command: CreateProductCommand): Promise<unknown> {
        await this.productRepository.createProduct(command.body);
        return;
    }
}
