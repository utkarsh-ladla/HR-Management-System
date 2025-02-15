import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import axios from 'axios'

const Add = () => {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    };
    getDepartments()
  },[])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //Dynamically append all values of form data
    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })
    try {
      const response = await axios.post('http://localhost:3000/api/Employees/add', formDataObj, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        navigate("/admin-dashboard/Employees")
      }
    } catch (error) {
      if (error.response && error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input type="text" name='name' placeholder='Insert Name'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
              onChange={handleChange}
            />
          </div>
          <div >
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input type="email" name='email' onChange={handleChange} placeholder='Insert Email'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
            <input type="text" name='employeeId' onChange={handleChange} placeholder='Employee ID'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div >
            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <input type="date" name='dob' onChange={handleChange} placeholder='DOB'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>
          <div >
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select name='gender' onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div >
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select name='maritalStatus'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div >
            <label className='block text-sm font-medium text-gray-700'>Desgnation</label>
            <input type="text" name='designation' onChange={handleChange} placeholder='Designation'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div >
            <label className='block text-sm font-medium text-gray-700'>Department</label>
            <select name='department'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Department</option>
              {/* fetching Department data from db showing realtionship */}
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>

          {/* Salary */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Salary</label>
            <input type="number" name='salary' onChange={handleChange} placeholder='Salary'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Password */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input type="password" name='password' onChange={handleChange} placeholder='******'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Role */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Role</label>
            <select name='role'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image Upload */}
          <div >
            <label className='block text-sm font-medium text-gray-700'>Upload Image</label>
            <input type="file" name='image' onChange={handleChange} placeholder='Upload Image' accept='image/*'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <button
            type='submit'
            className='w-100 rounded-md mt-6 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4'
          >
            Add Employee
          </button>

        </div>
      </form>
    </div>
  )
}

export default Add