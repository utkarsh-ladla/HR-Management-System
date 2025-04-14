import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: Date,
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half-day', 'on-leave'],
    default: 'present'
  },
  totalHours: Number,
  notes: String
}, { timestamps: true });

// Index for faster queries
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;