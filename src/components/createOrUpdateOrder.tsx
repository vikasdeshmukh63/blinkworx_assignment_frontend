import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CONSTANTS } from '../constants/constants'
import { useOrders } from '../hooks/useOrders'
import { OrderRequest } from '../types/types'
import { FaShoppingCart } from 'react-icons/fa'

interface CreateOrUpdateProps {
    type: string
    onSubmit: (payload: OrderRequest, id?: number) => void
}

const CreateOrUpdate: React.FC<CreateOrUpdateProps> = ({ type, onSubmit }) => {
    const { products, useOrderById } = useOrders()
    const [orderDescription, setOrderDescription] = useState('')
    const [selectedItem, setSelectedItem] = useState<number[]>([])
    const navigate = useNavigate()
    const { orderId } = useParams<{ orderId?: string }>()

    const { data: order, isSuccess } = useOrderById(orderId ? parseInt(orderId) : 0)

    useEffect(() => {
        if (type === CONSTANTS.EDIT && order && isSuccess) {
            setOrderDescription(order.orderDescription)
            setSelectedItem(order.products.map((product) => product.id))
        }
    }, [type, order, isSuccess])

    const handleSubmit = () => {
        if (type === CONSTANTS.EDIT) {
            onSubmit({ orderDescription, productIds: selectedItem }, Number(orderId))
        } else {
            onSubmit({ orderDescription, productIds: selectedItem })
        }
        navigate('/')
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-6">{type === CONSTANTS.CREATE ? 'New Order' : 'Edit Order'}</h2>
                    <div className="relative">
                        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200">
                            <FaShoppingCart />
                        </button>
                        {selectedItem.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {selectedItem.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* Order Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Description</label>
                    <textarea
                        value={orderDescription}
                        onChange={(e) => setOrderDescription(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Enter order description"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Items</label>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
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

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => navigate('/orders')}
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

export default CreateOrUpdate
