import axios from 'axios'
import { Order, OrderRequest, Product } from '../types/types'
import { config } from '../config/config'

const BASE_URL = config.apiUrl

export const api = {
    getOrders: async (): Promise<Order[]> => {
        const response = await axios.get(`${BASE_URL}/order`)
        return response.data.data
    },

    getProduct: async (): Promise<Product[]> => {
        const response = await axios.get(`${BASE_URL}/product`)
        return response.data.data
    },

    searchOrders: async (query: string): Promise<Order[]> => {
        const response = await axios.get(`${BASE_URL}/orders/search`, {
            params: { query }
        })
        return response.data.data
    },

    getOrderById: async (id: number): Promise<Order> => {
        const response = await axios.get(`${BASE_URL}/orders/${id}`)
        return response.data.data
    },

    createOrder: async (orderData: OrderRequest): Promise<Order> => {
        const response = await axios.post(`${BASE_URL}/order`, orderData)
        return response.data.data
    },

    updateOrder: async (id: number, orderData: OrderRequest): Promise<Order> => {
        const response = await axios.put(`${BASE_URL}/orders/${id}`, orderData)
        return response.data.data
    },

    deleteOrder: async (id: number): Promise<void> => {
        await axios.delete(`${BASE_URL}/orders/${id}`)
    }
}
