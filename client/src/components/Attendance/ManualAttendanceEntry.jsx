import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ManualAttendanceEntry() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date(),
    checkIn: '',
    checkOut: '',
    status: 'present',
    notes: ''
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data.employees);
      } catch (err) {
        toast.error('Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/attendance/manual', formData);
      toast.success('Attendance record added successfully');
      setFormData({
        employeeId: '',
        date: new Date(),
        checkIn: '',
        checkOut: '',
        status: 'present',
        notes: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add record');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manual Attendance Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Employee</label>
          <select
            value={formData.employeeId}
            onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.employeeId})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Date</label>
          <DatePicker
  selected={formData.date}
  onChange={(date) => setFormData({...formData, date})}
  dateFormat="MMMM d, yyyy"
  className="w-full p-2 border rounded"
  required
/>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Check In</label>
            <input
              type="time"
              value={formData.checkIn}
              onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Check Out</label>
            <input
              type="time"
              value={formData.checkOut}
              onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
            <option value="half-day">Half Day</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
}

export default ManualAttendanceEntry;