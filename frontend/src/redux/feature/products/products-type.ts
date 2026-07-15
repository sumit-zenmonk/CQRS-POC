export interface ProductType {
    uuid: string,
    name: string,
    description: string,
    price: number,
    created_at: string,
    updated_at: string,
    deleted_at: null
}

export interface ProductState {
    products: ProductType[];
    totalProductDocuments: number,
    loading: boolean;
    error: string | null;
}