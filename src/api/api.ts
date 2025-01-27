import axios from 'axios'
import { Order, OrderRequest, Product } from '../types/types'
import { config } from '../config/config'

const BASE_URL = config.apiUrl

export const api = {
    // fetch all orders from backend
    getOrders: async (): Promise<Order[]> => {
        const response = await axios.get(`${BASE_URL}/order`)
        return response.data.data
    },

    // get all available products
    getProduct: async (): Promise<Product[]> => {
        const response = await axios.get(`${BASE_URL}/product`)
        return response.data.data
    },

    // search orders based on query string
    searchOrders: async (query: string): Promise<Order[]> => {
        const response = await axios.get(`${BASE_URL}/orders/search`, {
            params: { query }
        })
        return response.data.data
    },

    // getch single order details by id
    getOrderById: async (id: number): Promise<Order> => {
        const response = await axios.get(`${BASE_URL}/orders/${id}`)
        return response.data.data
    },

    // create new order with products
    createOrder: async (orderData: OrderRequest): Promise<Order> => {
        const response = await axios.post(`${BASE_URL}/order`, orderData)
        return response.data.data
    },

    // update existing order details and products
    updateOrder: async (id: number, orderData: OrderRequest): Promise<Order> => {
        const response = await axios.put(`${BASE_URL}/orders/${id}`, orderData)
        return response.data.data
    },

    // permanantly remove order from system
    deleteOrder: async (id: number): Promise<void> => {
        await axios.delete(`${BASE_URL}/orders/${id}`)
    }
}
