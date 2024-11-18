import React from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-indigo-900 text-white flex flex-col fixed top-0 left-0 pt-16">
      {/* Navigation Link */}
      <nav className="flex-1 mt-6">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `block py-3 px-6 flex items-center ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
            }`
          }
          end
        >
          <FaHome className="mr-3" /> Dashboard
        </NavLink>
        <NavLink
          to="/admin-dashboard/Employees"
          className={({ isActive }) =>
            `block py-3 px-6 flex items-center ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
            }`
          }
        >
          <FaUser className="mr-3" /> Employee Information
        </NavLink>
        <NavLink
          to="/admin-dashboard/Department"
          className={({ isActive }) =>
            `block py-3 px-6 flex items-center ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
            }`
          }
        >
          <FaUser className="mr-3" /> Department
        </NavLink>
        <NavLink
          to="/admin-dashboard/Attendance"
          className={({ isActive }) =>
            `block py-3 px-6 flex items-center ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
            }`
          }
        >
          <FaCog className="mr-3" /> Time and Attendance
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
