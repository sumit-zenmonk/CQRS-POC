import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/infrastructure/repository/product.repository";
import { UpdateProductDto } from "./update-product.dto";

@Injectable()
export default class UpdateProductService {
    constructor(
        private readonly repository: ProductRepository,
    ) { }

    async handle(product_uuid: string, body: UpdateProductDto) {
        await this.repository.updateOneByClauses(
            {
                uuid: product_uuid
            },
            body
        );

        return;
    }
}
