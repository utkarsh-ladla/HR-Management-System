import React from 'react'
import { useAuth } from '../context/authContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'


function AdminDashboard() {
  const {user} = useAuth()

  return (
    <div>
      {/* Navbar stays at the top */}
      <Navbar />

      {/* Main layout with sidebar and content */}
      <div className="flex">
        <AdminSidebar />
        {/* Content area for the dashboard */}
        <div className="flex-1 p-6 ml-64 mt-16"> 
          {/* Added padding and left margin to avoid overlap with sidebar */}
          {/* <AdminSummary /> */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard