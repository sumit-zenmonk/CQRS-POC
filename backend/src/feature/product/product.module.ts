import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetProductLisintgModule } from "./get-product-listing/get-product-listing.module";
import { CreateProductModule } from "./create-product/create-product.module";

@Module({
    imports: [
        CreateProductModule,
        GetProductLisintgModule,
        RouterModule.register([
            {
                path: 'product',
                children: [
                    { path: '', module: CreateProductModule },
                    { path: '', module: GetProductLisintgModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class ProductModule { }