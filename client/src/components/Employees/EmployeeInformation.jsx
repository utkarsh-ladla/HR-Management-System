import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const EmployeeInformation = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the server
    axios.get('/api/employees')
      .then(response => setEmployees(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Employee Information</h2>

      {/* Employees List */}
      <h3 className="text-xl font-bold mb-4">All Employees</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {employees.map(employee => (
          <div key={employee._id} className="border p-4 rounded-lg shadow-lg">
            <h4 className="font-bold">{employee.name}</h4>
            <p>Phone: {employee.contactDetails?.phone}</p>
            <p>Email: {employee.contactDetails?.email}</p>
            <p>Job Role: {employee.jobRole}</p>
            <p>Salary: {employee.salary}</p>
            <p>Performance History: {employee.performanceHistory.join(', ')}</p>

            {/* Link to Employee Details */}
            <Link to={`/admin-dashboard/employees/${employee._id}`} className="text-blue-500 underline">
              View Details
            </Link>

            {/* Document Upload Section */}
            <div className="mt-4">
              <h5 className="font-bold">Documents</h5>
              <ul>
                {employee.documents.map(doc => (
                  <li key={doc.fileName}>
                    <a href={doc.filePath} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {doc.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeInformation;
