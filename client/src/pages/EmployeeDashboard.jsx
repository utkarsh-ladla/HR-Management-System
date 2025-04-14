import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function EmployeeDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Employee Portal</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/employee-dashboard" 
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Attendance
              </Link>
            </li>
            {/* Add more employee navigation items as needed */}
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;