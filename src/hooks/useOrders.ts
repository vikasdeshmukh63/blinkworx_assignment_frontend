import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/api'
import { Order, OrderRequest, Product } from '../types/types'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'

export const useOrders = () => {
    const queryClient = useQueryClient()

    const showErrorNotification = debounce((message: string) => {
        toast.error(message)
    }, 500)

    const ordersQuery = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: api.getOrders,
        retry: 3
    })

    if (ordersQuery.isError) {
        showErrorNotification(`Failed to fetch orders: ${(ordersQuery.error as Error).message}`)
    }

    const useOrderById = (id: number) => {
        const queryResult = useQuery<Order, Error>({
            queryKey: ['order', id],
            queryFn: () => api.getOrderById(id),
            enabled: !!id,
            retry: 3
        })

        if (queryResult.isError) {
            showErrorNotification(`Failed to fetch order: ${(queryResult.error as Error).message}`)
        }

        return queryResult
    }

    const productsQuery = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: api.getProduct,
        retry: 3
    })

    if (productsQuery.isError) {
        showErrorNotification(`Failed to fetch products: ${(productsQuery.error as Error).message}`)
    }

    const searchOrdersQuery = (query: string) => {
        const queryResult = useQuery<Order[], Error>({
            queryKey: ['orders', query],
            queryFn: () => api.searchOrders(query),
            enabled: !!query,
            retry: 3
        })

        if (queryResult.isError) {
            showErrorNotification(`Search failed: ${(queryResult.error as Error).message}`)
        }

        return queryResult
    }

    const createOrderMutation = useMutation<Order, Error, OrderRequest>({
        mutationFn: api.createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: (error: Error) => {
            showErrorNotification(`Failed to create order: ${error.message}`)
        },
        retry: 3
    })

    const updateOrderMutation = useMutation<Order, Error, { id: number; data: OrderRequest }>({
        mutationFn: ({ id, data }) => api.updateOrder(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: (error: Error) => {
            showErrorNotification(`Failed to update order: ${error.message}`)
        },
        retry: 3
    })

    const deleteOrderMutation = useMutation<void, Error, number>({
        mutationFn: api.deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: (error: Error) => {
            showErrorNotification(`Failed to delete order: ${error.message}`)
        },
        retry: 3
    })

    return {
        orders: ordersQuery.data || [],
        products: productsQuery.data || [],
        useOrderById,
        isLoading: ordersQuery.isLoading,
        createOrder: createOrderMutation.mutate,
        updateOrder: updateOrderMutation.mutate,
        deleteOrder: deleteOrderMutation.mutate,
        searchOrders: searchOrdersQuery
    }
}
