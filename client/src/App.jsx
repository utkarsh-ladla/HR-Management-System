import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import './App.css'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import List from './components/Employees/List'
import Add from './components/Employees/Add'
import AttendanceCheckInOut from './components/Attendance/TimeAndAttendance'
import AttendanceReport from './components/Attendance/AttendanceReport'
import ManualAttendanceEntry from './components/Attendance/ManualAttendanceEntry'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="department" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="departments/:id" element={<EditDepartment />} />
          <Route path="employees" element={<List />} />
          <Route path="add-employees" element={<Add />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
          <Route path="manual-attendance" element={<ManualAttendanceEntry />} />
          {/* Add TimeAndAttendance route */}
          <Route path="time-and-attendance" element={<AttendanceCheckInOut   />} />
        </Route>

        {/* Employee routes */}
        <Route 
          path="/employee-dashboard" 
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AttendanceCheckInOut />} />
          {/* Add other employee routes here */}
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App