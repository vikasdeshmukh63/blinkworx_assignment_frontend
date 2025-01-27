import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateOrUpdate from './pages/createOrUpdateOrder'
import NotFound from './components/notFound'
import OrdersList from './pages/ordersList'
import { CONSTANTS } from './constants/constants'
import { useOrders } from './hooks/useOrders'
import { OrderRequest } from './types/types'

const App: React.FC = () => {
    const { createOrder, updateOrder } = useOrders()

    // setitng up network status listeners
    useEffect(() => {
        // show success toast when network connects
        const handleOnline = () => {
            toast.success('Network connected!')
        }

        // show error toast when network disconnects
        const handleOffline = () => {
            toast.error('No network connection!')
        }

        // adding event listeners for network status
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // clearing up listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    // for creating new orders
    const handleCreateSubmit = (payload: OrderRequest) => {
        createOrder(payload)
    }

    // for updating existing orders
    const handleEditSubmit = (payload: OrderRequest, id?: number) => {
        if (id !== undefined) {
            updateOrder({ id, data: payload })
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* main orders listing page */}
                <Route
                    path="/"
                    element={<OrdersList />}
                />
                {/* create new order page */}
                <Route
                    path="/neworder"
                    element={
                        <CreateOrUpdate
                            type={CONSTANTS.CREATE}
                            onSubmit={handleCreateSubmit}
                        />
                    }
                />
                {/* edit existing order page */}
                <Route
                    path="/order/:orderId"
                    element={
                        <CreateOrUpdate
                            type={CONSTANTS.EDIT}
                            onSubmit={handleEditSubmit}
                        />
                    }
                />
                {/* 404 page for invalid routes */}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
