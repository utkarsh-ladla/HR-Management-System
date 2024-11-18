import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({...department, [name ] : value})

    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/department/add', department ,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(response.data.success){
                navigate("/admin-dashboard/add-department")
            }
        } catch (error) {
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-lg bg-gray-100">
      <div className="text-2xl font-bold mb-6 text-center">
        <h3 className="text-gray-700">Add Department</h3>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Department Name */}
        <div className="flex flex-col">
          <label htmlFor="dep_name" className="mb-2 text-gray-600 font-semibold">
            Department Name
          </label>
          <input
            type="text"
            id="dep_name"
            name="dep_name" 
            onChange={handleChange}
            placeholder="Enter Department Name"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-gray-600 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            onChange={handleChange}
            placeholder="Enter Description"
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition-all duration-200 ease-in-out"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;