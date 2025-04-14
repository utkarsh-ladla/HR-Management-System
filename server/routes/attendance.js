import express from 'express';
import {
  checkIn,
  checkOut,
  getAttendance,
  manualEntry
} from '../controllers/attendanceController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

// Employee self-service
router.post('/check-in', checkIn);
router.post('/check-out', checkOut);
router.get('/', getAttendance);

// HR/admin only
router.post('/manual', manualEntry);

export default router;