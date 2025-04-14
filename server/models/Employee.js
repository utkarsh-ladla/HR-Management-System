import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  maritalStatus: { type: String, required: true, enum: ['single', 'married'] },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'employee'] },
  createdAt: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;