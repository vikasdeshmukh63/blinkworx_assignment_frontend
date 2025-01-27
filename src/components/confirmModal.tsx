import React from 'react'

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
    // dnt render anything if modal is closed
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                {/* title and subtitle  */}
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to delete this item?</p>
                {/* action button  */}
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200">
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
