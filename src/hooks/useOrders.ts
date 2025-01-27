import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/api'
import { Order, OrderRequest, Product } from '../types/types'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'

export const useOrders = () => {
    const queryClient = useQueryClient()

    // Prevent multiple error toasts from appearing
    const showErrorNotification = debounce((message: string) => {
        toast.error(message)
    }, 500)

    // Main query to fetch all orders
    // retries 3 times before giving up
    const ordersQuery = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: api.getOrders,
        retry: 3
    })

    if (ordersQuery.isError) {
        showErrorNotification(`Failed to fetch orders: ${(ordersQuery.error as Error).message}`)
    }

    // Get single order details
    // only runs if id is provided
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

    // Fetch available products for order creation/update
    const productsQuery = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: api.getProduct,
        retry: 3
    })

    if (productsQuery.isError) {
        showErrorNotification(`Failed to fetch products: ${(productsQuery.error as Error).message}`)
    }

    // Mutation for creating new orders
    // invalidates orders query to refetch updated list
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

    // Update existing order details
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

    // Delete order mutation with success/error handling
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
        deleteOrder: deleteOrderMutation.mutate
    }
}
