'use client';

import { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/useOrderStore'
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'

export default function OrdersPage() {
    const { orders, fetchOrders, fetchOrder, selectedOrder, isLoading } = useOrderStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const handleSeeMore = async (orderId: string) => {
        try {
            await fetchOrder(orderId)
            setIsModalOpen(true)
        } catch (error) {
            toast.error('Failed to load order details')
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-6">Orders Management</h1>

                {/* Orders Table */}
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No orders found</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
                                            {order.user?.fullname || 'N/A'}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-700">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleSeeMore(order._id)}
                                                className="text-indigo-600 hover:text-indigo-900 font-medium"
                                            >
                                                See More
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Order Details Modal */}
                {isModalOpen && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
                        <div className="bg-white rounded-lg w-full max-w-2xl p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Order Details</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-red-500 hover:text-gray-700 text-xl font-bold cursor-pointer border-2 border-red-500 hover:border-gray-700 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4 text-sm sm:text-base">
                                <div>
                                    <h3 className="font-medium text-gray-500">User</h3>
                                    <p className="text-gray-800">{selectedOrder.user?.fullname || 'N/A'}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Total Price</h3>
                                    <p className="text-gray-800">${selectedOrder.totalPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Created At</h3>
                                    <p className="text-gray-800">
                                        {new Date(selectedOrder.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-500">Items</h3>
                                    <ul className="mt-2 space-y-2">
                                        {selectedOrder.items.map((orderItem, index) => (
                                            <li key={index} className="border-t pt-2">
                                                <p className="text-gray-800">
                                                    Item: {orderItem.item?.name || 'Unknown Item'}
                                                </p>
                                                <p className="text-gray-600">
                                                    Quantity: {orderItem.quantity}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
