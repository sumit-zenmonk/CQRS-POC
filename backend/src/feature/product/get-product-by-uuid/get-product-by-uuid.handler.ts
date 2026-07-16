import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/infrastructure/repository/product.repository";

@Injectable()
export default class GetProductByUuidService {
    constructor(
        private readonly repository: ProductRepository,
    ) { }

    async handle(product_uuid: string) {
        const product = await this.repository.findOneByWhereClause(
            {
                uuid: product_uuid
            }
        );

        return product;
    }
}
