export interface ProductType {
    uuid: string,
    name: string,
    description: string,
    price: number,
    image_url: string,
    user_uuid: string,
    created_at: string,
    updated_at: string,
    deleted_at: null
}

export interface CreateProductPayload {
    name: string,
    description: string,
    price: number,
    image_url: string,
}

export interface ProductState {
    products: ProductType[];
    totalProductDocuments: number,
    page: number,
    loading: boolean;
    error: string | null;
}