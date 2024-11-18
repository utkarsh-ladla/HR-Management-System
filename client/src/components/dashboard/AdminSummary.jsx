import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaUser, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle} from 'react-icons/fa'

const AdminSummary = () => {
    return (
        <div className='p-6'>
        <h3 className='text-2xl font-bold mb-4'>Dashboard Overview</h3>

        {/* Summary Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SummaryCard 
                icon={<FaUser className="text-blue-600 text-4xl" />} 
                text="Total Employees" 
                number={13} 
            />
            {/* You can add more SummaryCard components here */}
            <SummaryCard 
                icon={<FaBuilding className="text-green-600 text-4xl" />} 
                text="Total Departments" 
                number={10} 
            />
            <SummaryCard 
                icon={<FaUser className="text-red-600 text-4xl" />} 
                text="Monthly Salary" 
                number={300} 
            />

        </div>
        
        <h4 className="text-center text-2xl font-bold mt-12">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={"5"} />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={"2"} />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={"4"} />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={"1"} />
        </div>
    </div>

    )
}

export default AdminSummary