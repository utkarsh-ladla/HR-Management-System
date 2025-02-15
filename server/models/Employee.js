import mongoose from "mongoose";
import { Schema } from "mongoose";
 

const employeeSchema = new Schema({
  //Employees have conncetion with user 
  userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  employeeId: {type:String, required:true, unique: true},
  dob: {type:Date},
  gender: {type: String},
  maritalStatus: {type:String},
  designation: {type:String},
  department: {type: Schema.Types.ObjectId, ref:"Department", required: true},
  salary: {type:Number, required: true},
  createdAt: { type:Date, default: Date.now},
  updatedAt: {type:Date, default:Date.now}
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;













// // Create a schema for the Employee
// const EmployeeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   phone: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//     match: [/.+\@.+\..+/, 'Please fill a valid email address']
//   },
//   jobRole: {
//     type: String,
//     required: true
//   },
//   salary: {
//     type: Number,
//     required: true
//   },
//   performanceHistory: {
//     type: [String], // Array of performance-related strings (e.g., 'Exceeded targets in Q1')
//     default: []
//   },
//   documents: [{
//     fileName: {
//       type: String
//     },
//     filePath: {
//       type: String
//     }
//   }]
// }, {
//   timestamps: true // Automatically adds createdAt and updatedAt fields
// });

// // Export the model
// module.exports = mongoose.model('Employee', EmployeeSchema);
