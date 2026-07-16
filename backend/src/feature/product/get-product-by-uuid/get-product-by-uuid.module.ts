import { Module } from "@nestjs/common";
import { ProductRepository } from "src/infrastructure/repository/product.repository";
import { GetProductByUuidController } from "./get-product-by-uuid.controller";
import GetProductByUuidService from "./get-product-by-uuid.handler";

@Module({
    imports: [],
    controllers: [GetProductByUuidController],
    providers: [ProductRepository, GetProductByUuidService],
    exports: [],
})
export class GetProductByUuidModule { }
