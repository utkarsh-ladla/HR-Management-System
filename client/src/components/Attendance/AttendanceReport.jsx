import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AttendanceReport() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [department, setDepartment] = useState('');

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const params = {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };
      if (department) params.department = department;
      
      const res = await axios.get('/api/attendance', { params });
      setAttendance(res.data.attendance);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Report</h1>
      
      <div>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>
        <button
          onClick={fetchAttendance}
          disabled={loading}
          className="self-end px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Filter'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Employee</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Check In</th>
              <th className="py-2 px-4 border">Check Out</th>
              <th className="py-2 px-4 border">Total Hours</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map(record => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">
                  {record.employeeId?.name} ({record.employeeId?.employeeId})
                </td>
                <td className="py-2 px-4 border">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  {record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}
                </td>
                <td className="py-2 px-4 border">
                  {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}
                </td>
                <td className="py-2 px-4 border">
                  {record.totalHours || '-'}
                </td>
                <td className="py-2 px-4 border">
                  <span className={`px-2 py-1 rounded text-xs ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'absent' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceReport;