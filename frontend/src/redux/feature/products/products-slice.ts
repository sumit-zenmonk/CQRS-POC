import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './products-type';
import { deleteProduct, fetchProducts } from './products-action';

const initialState: ProductState = {
    products: [],
    totalProductDocuments: 0,
    page: 0,
    loading: false,
    error: null,
};

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                const newProducts = action.payload.data.data.filter(
                    (newProduct) =>
                        !state.products.some((existing) => existing.uuid === newProduct.uuid)
                );
                state.products = [...state.products, ...newProducts];
                state.totalProductDocuments = action.payload.data.total;
                state.page = action.payload.page;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const { product_uuid, message } = action.payload;
                state.loading = false;
                state.error = null;

                const productIndex = state.products.findIndex((product) => product.uuid === product_uuid);
                if (productIndex !== -1) {
                    state.totalProductDocuments = state.totalProductDocuments - 1;
                    state.products = state.products.filter((product) => product.uuid !== product_uuid);
                }

            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default ProductSlice.reducer;