import express from 'express';
import {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Add new employee
router.post('/add', addEmployee);

// Get all employees
router.get('/', getEmployees);

// Get single employee
router.get('/:id', getEmployee);

// Update employee
router.put('/:id', updateEmployee);

// Delete employee
router.delete('/:id', deleteEmployee);




export default router;