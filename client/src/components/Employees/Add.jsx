import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    designation: '',
    department: '',
    salary: '',
    password: '',
    role: 'employee' // Default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
// Add this at the top of your component file
const API_BASE_URL = 'http://localhost:3000'; // Your backend server

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/employees/add`, // Correct URL
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    // ... rest of your code
  } catch (error) {
    // ... error handling
  }
};
const handleEdit = (id) => {
  navigate(`/admin-dashboard/edit-employee/${id}`);
};

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input 
              type="text" 
              name='name' 
              value={formData.name}
              onChange={handleChange}
              placeholder='Insert Name'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input 
              type="email" 
              name='email' 
              value={formData.email}
              onChange={handleChange}
              placeholder='Insert Email'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Employee ID</label>
            <input 
              type="text" 
              name='employeeId' 
              value={formData.employeeId}
              onChange={handleChange}
              placeholder='Employee ID'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Date of Birth</label>
            <input 
              type="date" 
              name='dob' 
              value={formData.dob}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select 
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
            <select 
              name='maritalStatus'
              value={formData.maritalStatus}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Designation</label>
            <input 
              type="text" 
              name='designation' 
              value={formData.designation}
              onChange={handleChange}
              placeholder='Designation'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Department</label>
            <input 
              type="text" 
              name='department' 
              value={formData.department}
              onChange={handleChange}
              placeholder='Department'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Salary</label>
            <input 
              type="number" 
              name='salary' 
              value={formData.salary}
              onChange={handleChange}
              placeholder='Salary'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Password</label>
            <input 
              type="password" 
              name='password' 
              value={formData.password}
              onChange={handleChange}
              placeholder='******'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Role</label>
            <select 
              name='role'
              value={formData.role}
              onChange={handleChange}
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-100 rounded-md mt-6 ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-400'} text-white font-bold py-2 px-4`}
          >
            {loading ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;