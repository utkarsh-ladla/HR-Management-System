import React from 'react'

const SummaryCard = ({icon, text, number}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center transition-transform transform hover:scale-105">
    {/* Icon Section */}
    <div className="text-blue-600 text-4xl mr-4">
      {icon}
    </div>

    {/* Text Section */}
    <div>
      <p className="text-lg font-semibold">{text}</p>
      <p className="text-2xl font-bold text-gray-800">{number}</p>
    </div>
  </div>
  )
}

export default SummaryCard