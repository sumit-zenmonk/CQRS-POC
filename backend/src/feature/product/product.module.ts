import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { GetProductLisintgModule } from "./get-product-listing/get-product-listing.module";

@Module({
    imports: [
        GetProductLisintgModule,
        RouterModule.register([
            {
                path: 'product',
                children: [
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