import React from 'react'
import { OrderTable } from './orderTable'

const OrdersList = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <OrderTable />
            </div>
        </div>
    )
}

export default OrdersList
