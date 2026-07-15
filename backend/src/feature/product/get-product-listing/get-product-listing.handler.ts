import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import GetProductLisintgQuery from "./get-product-listing.query";
import { ProductRepository } from "src/infrastructure/repository/product.repository";

@QueryHandler(GetProductLisintgQuery)
export default class LoginUserHandler implements IQueryHandler<GetProductLisintgQuery> {
    constructor(
        private readonly repository: ProductRepository,
    ) { }

    async execute(query: GetProductLisintgQuery) {
        const page = query.page || Number(process.env.PAGE);
        const limit = Number(process.env.LIMIT) || 10;
        const offset = (page - 1) * limit;

        return await this.repository.getProductListing(offset, limit);
    }
}
