import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                {/* 404 Heading */}
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600 mt-4">Oops! Page not found.</p>
                <p className="text-lg text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>

                {/* Back to Home Button */}
                <Link
                    to="/"
                    className="mt-8 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
