import { Module } from "@nestjs/common";
import { CreateProductController } from "./create-product.controller";
import CreateProductCommand from "./create-product.command";
import CreateProductHandler from "./create-product.handler";
import { ProductRepository } from "src/infrastructure/repository/product.repository";

@Module({
    imports: [],
    controllers: [CreateProductController],
    providers: [CreateProductCommand, CreateProductHandler, ProductRepository],
    exports: [],
})
export class CreateProductModule { }
