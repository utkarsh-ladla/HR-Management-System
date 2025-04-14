import Employee from '../models/Employee.js';
import bcrypt from 'bcryptjs';

// Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { 
      name, email, employeeId, dob, gender, 
      maritalStatus, designation, department, 
      salary, password, role 
    } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ $or: [{ email }, { employeeId }] });
    if (existingEmployee) {
      return res.status(400).json({ 
        success: false, 
        error: 'Employee with this email or ID already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      name,
      email,
      employeeId,
      dob: new Date(dob),
      gender,
      maritalStatus,
      designation,
      department,
      salary: Number(salary),
      password: hashedPassword,
      role
    });

    await newEmployee.save();

    res.status(201).json({ 
      success: true, 
      message: 'Employee added successfully',
      employee: newEmployee
    });
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select('-password');
    res.status(200).json({ 
      success: true, 
      employees 
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

// Get single employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select('-password');
    if (!employee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }
    res.status(200).json({ 
      success: true, 
      employee 
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const updates = req.body;
    
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!employee) {
      return res.status(404).json({ 
        success: false, 
        error: 'Employee not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Employee updated successfully',
      employee 
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

export const deleteEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      
      if (!employee) {
        return res.status(404).json({ 
          success: false, 
          error: 'Employee not found' 
        });
      }
  
      res.status(200).json({ 
        success: true, 
        message: 'Employee deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  };

  