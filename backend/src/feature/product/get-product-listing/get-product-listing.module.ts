import { Module } from "@nestjs/common";
import GetProductLisintgHandler from "./get-product-listing.handler";
import { GetProductLisintgController } from "./get-product-listing.controller";
import GetProductLisintgQuery from "./get-product-listing.query";
import { ProductRepository } from "src/infrastructure/repository/product.repository";

@Module({
    imports: [],
    controllers: [GetProductLisintgController],
    providers: [ProductRepository, GetProductLisintgQuery, GetProductLisintgHandler],
    exports: [],
})
export class GetProductLisintgModule { }
