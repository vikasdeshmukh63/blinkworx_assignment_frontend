import React, { useEffect, useState } from 'react'
import { useOrders } from '../hooks/useOrders'
import { Order, OrderRequest } from '../types/types'
import { CONSTANTS } from '../constants/constants'

interface OrderModalProps {
    type: string
    isOpen: boolean
    onClose: () => void
    onSubmit: (payload: OrderRequest) => void
    data?: Order | null
}

const OrderModal: React.FC<OrderModalProps> = ({ type, isOpen, onClose, onSubmit, data = null }) => {
    const { products } = useOrders()
    const [orderDescription, setOrderDescription] = useState('')
    const [selectedItem, setSelectedItem] = useState<number[]>([])

    console.log(selectedItem)

    const handleSubmit = () => {
        onSubmit({ orderDescription, productIds: selectedItem })
        onClose()
    }

    useEffect(() => {
        if (data) {
            setSelectedItem(data.products.map((product) => product.id))
            setOrderDescription(data.orderDescription)
        } else {
            setSelectedItem([])
            setOrderDescription('')
        }
    }, [data])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h2 className="text-xl font-bold mb-4">{type === CONSTANTS.CREATE ? 'New Order' : 'Edit Order'}</h2>

                {/* Order Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Description</label>
                    <textarea
                        value={orderDescription}
                        onChange={(e) => setOrderDescription(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter order description"
                    />
                </div>

                {/* Item Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Items</label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition duration-200">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 mt-1 mr-3 cursor-pointer accent-blue-500"
                                    checked={selectedItem.includes(product.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedItem((prev) => [...prev, product.id])
                                        } else {
                                            setSelectedItem((prev) => prev.filter((id) => id !== product.id))
                                        }
                                    }}
                                />
                                <div>
                                    <p className="font-medium text-gray-800">{product.productName}</p>
                                    <p className="text-sm text-gray-600">{product.productDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderModal
