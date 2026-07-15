import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState, ProductType } from './products-type';
import { fetchProducts } from './products-action';

const initialState: ProductState = {
    products: [],
    totalProductDocuments: 0,
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
                state.totalProductDocuments = action.payload.data.totalDocuments;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default ProductSlice.reducer;