import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from '../hooks/useBoolean'
import { useOrders } from '../hooks/useOrders'
import { useSearchOrders } from '../hooks/useSearchOrders'
import { Order } from '../types/types'
import ConfirmModal from './confirmModal'
import { SkeletonRow } from './skeletonRow'

// define the table headings
const tableHeadings = [
    {
        key: 'id',
        label: 'Order ID',
        className: 'p-3 text-left text-sm font-semibold text-gray-700'
    },
    {
        key: 'orderDescription',
        label: 'Order Description',
        className: 'p-3 text-left text-sm font-semibold text-gray-700'
    },
    {
        key: 'products',
        label: 'Count of Products',
        className: 'p-3 text-left text-sm font-semibold text-gray-700'
    },
    {
        key: 'createdAt',
        label: 'Created At',
        className: 'p-3 text-left text-sm font-semibold text-gray-700'
    },
    {
        key: 'actions',
        label: 'Actions',
        className: 'p-3 text-left text-sm font-semibold text-gray-700'
    }
]

export const OrderTable: React.FC = () => {
    // custom hook to get orders and delete order
    const { orders, deleteOrder } = useOrders()

    // state management
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const openConfirmDelete = useBoolean()

    const navigate = useNavigate()

    // custom hook to search orders
    const { data: searchResults, isLoading } = useSearchOrders(searchTerm)

    // display orders based on search term
    const displayOrders = searchTerm ? searchResults || [] : orders

    // handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
    }

    // handle delete
    const handleDelete = (data: Order) => {
        setSelectedOrder(data)
        openConfirmDelete.onTrue()
    }

    // handle confirm delete
    const handleConfirmDelete = () => {
        if (selectedOrder) {
            deleteOrder(selectedOrder.id)
            openConfirmDelete.onFalse()
        }
    }

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                {/* title */}
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Order Management</h1>
                {/* search input */}
                <input
                    type="text"
                    placeholder="Search by Order ID or Description"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full md:w-1/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                {/* table  */}
                <table className="w-full border-collapse bg-white  overflow-hidden">
                    {/* table head  */}
                    <thead className="bg-gray-200">
                        <tr>
                            {tableHeadings.map((heading) => (
                                <th
                                    key={heading.key}
                                    className={heading.className}>
                                    {heading.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* table body  */}
                    <tbody>
                        {/* loading skeleton */}
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
                        ) : displayOrders.length === 0 ? (
                            // no orders found
                            <tr>
                                <td
                                    colSpan={tableHeadings.length}
                                    className="p-6 text-center text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            // display orders
                            displayOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50 transition duration-200">
                                    {/* order id  */}
                                    <td className="p-3 border-t text-sm text-gray-700">{order.id}</td>
                                    {/* order description  */}
                                    <td className="p-3 border-t text-sm text-gray-700">{order.orderDescription}</td>
                                    {/* count of products  */}
                                    <td className="p-3 border-t text-sm text-gray-700">{order.products.length}</td>
                                    {/* created at  */}
                                    <td className="p-3 border-t text-sm text-gray-700">{new Date(order.createdAt).toLocaleString()}</td>
                                    {/* action buttons  */}
                                    <td className="p-3 border-t text-sm">
                                        <button
                                            onClick={() => navigate(`/order/${order.id}`)}
                                            className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between item-center">
                {/* new order button  */}
                <button
                    onClick={() => navigate(`/neworder`)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200">
                    New Order
                </button>
                {/* total order coutn  */}
                <p>Total Orders: {displayOrders.length}</p>
            </div>

            {/* confirm delete modal  */}
            <ConfirmModal
                isOpen={openConfirmDelete.value}
                onClose={openConfirmDelete.onFalse}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}
