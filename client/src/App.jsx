import { useState } from 'react'
import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import './App.css'
import EmployeeDashboard from './pages/EmployeeDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div className='text-3xl text-teal-500'>Welcome </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
      <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
