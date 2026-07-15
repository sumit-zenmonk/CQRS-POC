import { Injectable } from "@nestjs/common";
import { ProductEntity } from "src/domain/product/product.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(ProductEntity, dataSource.createEntityManager());
    }

    async getProductListing(offset: number, limit: number) {
        const [data, total] = await this.findAndCount({
            order: {
                created_at: "DESC",
            },
            skip: offset,
            take: limit,
        });

        return { data, total };
    }

    async deleteProduct(uuid: string) {
        await this.softDelete(uuid);
        return;
    }
}