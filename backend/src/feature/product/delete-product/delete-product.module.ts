import { Module } from "@nestjs/common";
import { DeleteProductController } from "./delete-product.controller";
import DeleteProductCommand from "./delete-product.command";
import DeleteProductHandler from "./delete-product.handler";
import { ProductRepository } from "src/infrastructure/repository/product.repository";

@Module({
    imports: [],
    controllers: [DeleteProductController],
    providers: [DeleteProductCommand, DeleteProductHandler, ProductRepository],
    exports: [],
})
export class DeleteProductModule { }
