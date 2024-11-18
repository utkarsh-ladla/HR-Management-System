import express from 'express'
import authMidleware from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments,getDepartment, updateDepartment, deleteDepartment} from '../controllers/departmentController.js'

const router = express.Router()

router.get('/', authMidleware, getDepartments)
router.post('/add', authMidleware, addDepartment)
router.get('/:id', authMidleware, getDepartment)
router.put('/:id', authMidleware, updateDepartment)
router.delete('/:id', authMidleware, deleteDepartment)

export default router