import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function List() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employees', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEmployees(response.data.employees);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEmployees(employees.filter(employee => employee._id !== id));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete employee');
      }
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <input 
          type="text" 
          className="px-4 py-2 border rounded" 
          placeholder='Search By Department' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link 
          to="/admin-dashboard/add-Employees" 
          className='px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600'
        >
          Add New Employee
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Employee ID</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Designation</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{employee.name}</td>
                <td className="py-2 px-4 border">{employee.employeeId}</td>
                <td className="py-2 px-4 border">{employee.email}</td>
                <td className="py-2 px-4 border">{employee.department}</td>
                <td className="py-2 px-4 border">{employee.designation}</td>
                <td className="py-2 px-4 border">
                  <div className="flex space-x-2">

                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;