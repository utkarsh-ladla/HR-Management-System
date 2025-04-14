import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

const AttendanceCheckInOut = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceState, setAttendanceState] = useState({
    status: 'notStarted', // 'notStarted', 'clockedIn', 'completed'
    lastAction: null,
    todayRecord: null,
    records: [],
    loading: false,
    loadingRecords: false,
    error: '',
    success: ''
  });
  const [user, setUser] = useState({
    id: null,
    isAdmin: false,
    name: '',
    department: ''
  });

  // Initialize user data and fetch attendance
  useEffect(() => {
    const initializeUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.id) {
        setUser({
          id: userInfo.id,
          isAdmin: ['admin', 'hr'].includes(userInfo.role),
          name: userInfo.name || '',
          department: userInfo.department || ''
        });
        
        await fetchTodayAttendance(userInfo.id);
        
        if (['admin', 'hr'].includes(userInfo.role)) {
          await fetchAllAttendanceRecords();
        }
      }
    };

    initializeUser();
  }, []);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch today's attendance record
  const fetchTodayAttendance = async (userId) => {
    try {
      setAttendanceState(prev => ({ ...prev, loading: true, error: '' }));
      
      const today = format(new Date(), 'yyyy-MM-dd');
      const response = await axios.get(`/api/attendance/user/${userId}/date/${today}`);
      
      if (response.data?.record) {
        const record = response.data.record;
        let status = 'notStarted';
        let lastAction = null;
        
        if (record.clockOut) {
          status = 'completed';
          lastAction = 'clockOut';
        } else if (record.clockIn) {
          status = 'clockedIn';
          lastAction = 'clockIn';
        }
        
        setAttendanceState(prev => ({
          ...prev,
          status,
          lastAction,
          todayRecord: record
        }));
      }
    } catch (err) {
      console.error('Attendance fetch error:', err);
      setAttendanceState(prev => ({
        ...prev,
        error: err.response?.data?.message || 'Failed to fetch attendance data'
      }));
    } finally {
      setAttendanceState(prev => ({ ...prev, loading: false }));
    }
  };

  // Fetch all attendance records (admin only)
  const fetchAllAttendanceRecords = async () => {
    try {
      setAttendanceState(prev => ({ ...prev, loadingRecords: true }));
      
      const response = await axios.get('/api/attendance/all');
      
      if (response.data?.records) {
        setAttendanceState(prev => ({
          ...prev,
          records: response.data.records
        }));
      }
    } catch (err) {
      console.error('Records fetch error:', err);
      setAttendanceState(prev => ({
        ...prev,
        error: 'Failed to fetch attendance records'
      }));
    } finally {
      setAttendanceState(prev => ({ ...prev, loadingRecords: false }));
    }
  };

  // Handle clock in/out actions
  const handleAttendanceAction = async (action) => {
    try {
      setAttendanceState(prev => ({
        ...prev,
        loading: true,
        error: '',
        success: ''
      }));
      
      const endpoint = action === 'clockIn' 
        ? '/api/attendance/clock-in' 
        : '/api/attendance/clock-out';
      
      const payload = action === 'clockIn'
        ? { userId: user.id, clockInTime: new Date().toISOString() }
        : { 
            userId: user.id, 
            attendanceId: attendanceState.todayRecord?.id,
            clockOutTime: new Date().toISOString() 
          };
      
      const response = await axios.post(endpoint, payload);
      
      if (response.data?.success) {
        const successMessage = action === 'clockIn' 
          ? 'Successfully clocked in!' 
          : 'Successfully clocked out!';
        
        const newStatus = action === 'clockIn' ? 'clockedIn' : 'completed';
        
        setAttendanceState(prev => ({
          ...prev,
          status: newStatus,
          lastAction: action,
          todayRecord: response.data.record,
          success: successMessage
        }));
        
        // Refresh records if admin
        if (user.isAdmin) {
          await fetchAllAttendanceRecords();
        }
      }
    } catch (err) {
      console.error(`${action} error:`, err);
      setAttendanceState(prev => ({
        ...prev,
        error: err.response?.data?.message || `Failed to ${action}. Please try again.`
      }));
    } finally {
      setAttendanceState(prev => ({ ...prev, loading: false }));
    }
  };

  // Helper functions for date/time formatting
  const formatTimeDisplay = (date) => format(date, 'h:mm:ss a');
  const formatDateDisplay = (date) => format(date, 'EEEE, MMMM d, yyyy');
  const formatTableDate = (dateString) => dateString ? format(parseISO(dateString), 'MMM d, yyyy') : '---';
  const formatTableTime = (dateString) => dateString ? format(parseISO(dateString), 'h:mm a') : '---';

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    const diffInMs = end - start;
    
    if (diffInMs < 0) return 'Invalid';
    
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffInHours}h ${diffInMinutes}m`;
  };

  // Status colors for UI
  const statusColors = {
    notStarted: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Not Clocked In' },
    clockedIn: { bg: 'bg-green-100', text: 'text-green-800', label: 'Clocked In' },
    completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Shift Completed' }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Time and Attendance</h1>
      
      {/* Current User's Attendance */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="bg-gray-50 border-b px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Today's Attendance</h2>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-500">Current Date</p>
              <p className="text-lg font-medium">{formatDateDisplay(currentTime)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Time</p>
              <p className="text-lg font-medium">{formatTimeDisplay(currentTime)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className={`text-lg font-medium ${statusColors[attendanceState.status].text}`}>
                {statusColors[attendanceState.status].label}
              </p>
            </div>
          </div>

          {attendanceState.error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
              <p>{attendanceState.error}</p>
            </div>
          )}
          
          {attendanceState.success && (
            <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">
              <p>{attendanceState.success}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Clock In Time</p>
              <p className="text-lg">
                {attendanceState.todayRecord?.clockIn 
                  ? formatTableTime(attendanceState.todayRecord.clockIn)
                  : '-- : -- --'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Clock Out Time</p>
              <p className="text-lg">
                {attendanceState.todayRecord?.clockOut 
                  ? formatTableTime(attendanceState.todayRecord.clockOut)
                  : '-- : -- --'}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handleAttendanceAction('clockIn')}
              disabled={attendanceState.loading || attendanceState.status !== 'notStarted'}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md w-40 ${
                attendanceState.status !== 'notStarted' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {attendanceState.loading && attendanceState.lastAction === 'clockIn' 
                ? 'Processing...' 
                : 'Clock In'}
            </button>
            
            <button
              onClick={() => handleAttendanceAction('clockOut')}
              disabled={attendanceState.loading || attendanceState.status !== 'clockedIn'}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md w-40 ${
                attendanceState.status !== 'clockedIn' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {attendanceState.loading && attendanceState.lastAction === 'clockOut' 
                ? 'Processing...' 
                : 'Clock Out'}
            </button>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      {attendanceState.todayRecord && (
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="bg-gray-50 border-b px-6 py-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">Today's Summary</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Work Duration</p>
                <p className="text-lg">
                  {attendanceState.todayRecord.clockIn && attendanceState.todayRecord.clockOut 
                    ? calculateDuration(
                        attendanceState.todayRecord.clockIn, 
                        attendanceState.todayRecord.clockOut
                      )
                    : 'In Progress'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="text-lg">
                  {attendanceState.status === 'notStarted' ? 'Not Started' : 
                   attendanceState.status === 'clockedIn' ? 'In Progress' : 
                   'Completed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin View - All Attendance Records */}
      {user.isAdmin && (
        <div className="bg-white shadow rounded-lg">
          <div className="bg-gray-50 border-b px-6 py-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-semibold">Employee Attendance Records</h2>
            <button 
              onClick={fetchAllAttendanceRecords}
              disabled={attendanceState.loadingRecords}
              className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            {attendanceState.loadingRecords ? (
              <div className="p-6 text-center">Loading employee records...</div>
            ) : attendanceState.records.length === 0 ? (
              <div className="p-6 text-center">No attendance records found</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock In
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Clock Out
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceState.records.map((record) => {
                    const recordStatus = !record.clockIn 
                      ? 'notStarted' 
                      : !record.clockOut 
                        ? 'clockedIn' 
                        : 'completed';
                    
                    return (
                      <tr key={record._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {record.employee?.name || record.employeeName || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {record.employee?.department || record.department || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTableDate(record.date || record.clockIn)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTableTime(record.clockIn)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTableTime(record.clockOut)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {calculateDuration(record.clockIn, record.clockOut)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[recordStatus].bg} ${statusColors[recordStatus].text}`}>
                            {statusColors[recordStatus].label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};  

AttendanceCheckInOut.propTypes = {
  // Add PropTypes if needed
};

export default AttendanceCheckInOut;