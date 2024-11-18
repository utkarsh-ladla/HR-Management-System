import mongoose from "mongoose";

// Create a schema for the Employee
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  jobRole: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  performanceHistory: {
    type: [String], // Array of performance-related strings (e.g., 'Exceeded targets in Q1')
    default: []
  },
  documents: [{
    fileName: {
      type: String
    },
    filePath: {
      type: String
    }
  }]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('Employee', EmployeeSchema);
