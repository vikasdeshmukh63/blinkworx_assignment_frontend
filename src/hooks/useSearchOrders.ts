import { useQuery } from '@tanstack/react-query'
import { api } from '../api/api'
import { Order } from '../types/types'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'

// custom hook for searching orders with error handling
export const useSearchOrders = (query: string) => {
    // prevent error toast spam by debouncing
    const showErrorNotification = debounce((message: string) => {
        toast.error(message)
    }, 500)

    // setup query with react-query
    const queryResult = useQuery<Order[], Error>({
        queryKey: ['orders', query],
        queryFn: () => api.searchOrders(query),
        enabled: !!query,
        retry: 3
    })

    // show error toast if error in request
    if (queryResult.isError) {
        showErrorNotification(`Search failed: ${(queryResult.error as Error).message}`)
    }

    return queryResult
}
