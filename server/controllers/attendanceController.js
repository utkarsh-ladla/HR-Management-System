import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

// Check-in employee
export const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;
    
    // Check if already checked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existing = await Attendance.findOne({
      employeeId,
      date: { $gte: today }
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already checked in today'
      });
    }

    const attendance = new Attendance({
      employeeId,
      checkIn: new Date(),
      status: 'present'
    });

    await attendance.save();
    
    res.status(201).json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Check-out employee
export const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: today },
      checkOut: { $exists: false }
    });
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No check-in record found for today'
      });
    }
    
    const checkOutTime = new Date();
    attendance.checkOut = checkOutTime;
    
    // Calculate total hours worked
    const diffMs = checkOutTime - attendance.checkIn;
    attendance.totalHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
    
    await attendance.save();
    
    res.json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get attendance records
export const getAttendance = async (req, res) => {
  try {
    const { employeeId, startDate, endDate } = req.query;
    
    const query = {};
    if (employeeId) query.employeeId = employeeId;
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const attendance = await Attendance.find(query)
      .populate('employeeId', 'name employeeId department designation');
    
    res.json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Manual attendance entry (for HR/admin)
export const manualEntry = async (req, res) => {
  try {
    const { employeeId, date, checkIn, checkOut, status, notes } = req.body;
    
    // Validate employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }
    
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);
    
    // Check for existing record
    const existing = await Attendance.findOne({
      employeeId,
      date: attendanceDate
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Attendance record already exists for this date'
      });
    }
    
    const attendance = new Attendance({
      employeeId,
      date: attendanceDate,
      checkIn: new Date(checkIn),
      checkOut: checkOut ? new Date(checkOut) : null,
      status,
      notes
    });
    
    if (checkOut) {
      const diffMs = attendance.checkOut - attendance.checkIn;
      attendance.totalHours = (diffMs / (1000 * 60 * 60)).toFixed(2);
    }
    
    await attendance.save();
    
    res.status(201).json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};