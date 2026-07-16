import { Module } from "@nestjs/common";
import { ProductRepository } from "src/infrastructure/repository/product.repository";
import { UpdateProductController } from "./update-product.controller";
import UpdateProductService from "./update-product.handler";

@Module({
    imports: [],
    controllers: [UpdateProductController],
    providers: [ProductRepository, UpdateProductService],
    exports: [],
})
export class UpdateProductModule { }
