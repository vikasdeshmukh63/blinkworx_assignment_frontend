import React from 'react'

export const SkeletonRow: React.FC = () => {
    return (
        <tr className="animate-pulse">
            <td className="p-3 border-t">
                <div className="h-10 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 border-t">
                <div className="h-10 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 border-t">
                <div className="h-10 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 border-t">
                <div className="h-10 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3 border-t">
                <div className="h-10 bg-gray-200 rounded"></div>
            </td>
        </tr>
    )
}
