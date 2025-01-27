export interface Product {
    id: number
    productName: string
    productDescription: string
}

export interface OrderProductMap {
    id: number
    orderId: number
    productId: number
}

export interface Order {
    id: number
    orderDescription: string
    createdAt: string
    products: Product[]
}

export interface OrderRequest {
    orderDescription: string
    productIds: number[]
}
