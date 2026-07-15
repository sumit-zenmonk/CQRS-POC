import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import DeleteProductCommand from "./delete-product.command";
import { ProductRepository } from "src/infrastructure/repository/product.repository";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(DeleteProductCommand)
export default class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(command: DeleteProductCommand): Promise<unknown> {
        const product_uuid = command.product_uuid;

        // check product existance
        const isProductExists = await this.productRepository.findOneByClause({
            uuid: product_uuid
        });
        if (!isProductExists) {
            throw new BadRequestException("Product Not Found");
        }

        // delete product
        await this.productRepository.deleteProduct(product_uuid);
        return;
    }
}
