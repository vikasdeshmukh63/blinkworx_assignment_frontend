import { useQuery } from '@tanstack/react-query'
import { api } from '../api/api'
import { Order } from '../types/types'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'

// Custom hook for searching orders
export const useSearchOrders = (query: string) => {
    const showErrorNotification = debounce((message: string) => {
        toast.error(message)
    }, 500)

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
