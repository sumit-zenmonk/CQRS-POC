import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetProductLisintgModule } from "./get-product-listing/get-product-listing.module";
import { CreateProductModule } from "./create-product/create-product.module";
import { DeleteProductModule } from "./delete-product/delete-product.module";
import { GetProductByUuidModule } from "./get-product-by-uuid/get-product-by-uuid.module";

@Module({
    imports: [
        CreateProductModule,
        GetProductLisintgModule,
        DeleteProductModule,
        GetProductByUuidModule,
        RouterModule.register([
            {
                path: 'product',
                children: [
                    { path: '', module: CreateProductModule },
                    { path: '', module: GetProductLisintgModule },
                    { path: '', module: DeleteProductModule },
                    { path: '', module: GetProductByUuidModule },
                ],
            },
        ]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class ProductModule { }