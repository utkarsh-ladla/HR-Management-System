import React from 'react'
import { Link } from 'react-router-dom'

function List() {
  return (
    <div className='p-6'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Employee</h3>
        </div>
        <div className='flex justify-between item-center'>
          <input type="text" className="px-4 py-0.5 border" placeholder='Search By Dep Nmae' 
         
          />
          <Link to="/admin-dashboard/add-Employees" className='px-4 py-1 bg-red-500 rounded text-white'> Add New Employee</Link>
        </div>
    </div>
  )
}

export default List