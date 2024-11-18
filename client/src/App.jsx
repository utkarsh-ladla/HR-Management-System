import { useState } from 'react'
import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import './App.css'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import EmployeeInformation from './components/Employees/EmployeeInformation'
import TimeAndAttendance from './components/Attendance/TimeAndAttendance'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div className='text-3xl text-teal-500'>Welcome </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin"]}>
          <AdminDashboard />
          </RoleBasedRoutes>
        </PrivateRoutes>
        
        }>
          <Route index element={<AdminSummary />}></Route>
          <Route path="/admin-dashboard/Employees" element={<EmployeeInformation />}></Route>
          <Route path="/admin-dashboard/Department" element={<DepartmentList />}></Route>         
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>         
          <Route path="/admin-dashboard/departments/:id" element={<EditDepartment />}></Route>   
          <Route path="/admin-dashboard/Attendance" element={<TimeAndAttendance />}></Route>
          
        </Route>

      <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
