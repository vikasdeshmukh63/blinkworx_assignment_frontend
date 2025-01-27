import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateOrUpdate from './components/createOrUpdateOrder'
import NotFound from './components/notFound'
import OrdersList from './components/ordersList'
import { CONSTANTS } from './constants/constants'
import { useOrders } from './hooks/useOrders'
import { OrderRequest } from './types/types'

const App: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const { createOrder, updateOrder } = useOrders()

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true)
            toast.success('Network connected!')
        }

        const handleOffline = () => {
            setIsOnline(false)
            toast.error('No network connection!')
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    const handleCreateSubmit = (payload: OrderRequest) => {
        createOrder(payload)
    }

    const handleEditSubmit = (payload: OrderRequest, id?: number) => {
        console.log(id)
        if (id !== undefined) {
            updateOrder({ id, data: payload })
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<OrdersList />}
                />
                <Route
                    path="/neworder"
                    element={
                        <CreateOrUpdate
                            type={CONSTANTS.CREATE}
                            onSubmit={handleCreateSubmit}
                        />
                    }
                />
                <Route
                    path="/order/:orderId"
                    element={
                        <CreateOrUpdate
                            type={CONSTANTS.EDIT}
                            onSubmit={handleEditSubmit}
                        />
                    }
                />
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
