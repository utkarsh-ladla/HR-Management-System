import express from 'express'
import authMidleware from '../middleware/authMiddleware.js'
import { addEmpolyee, upload} from '../controllers/employeeController.js'
// import { upload } from '../controllers/employeeController.js'

const router = express.Router()

// router.get('/', authMidleware, getDepartments)
router.post('/add', authMidleware, upload.single('image'), addEmpolyee)
// router.get('/:id', authMidleware, getDepartment)
// router.put('/:id', authMidleware, updateDepartment)
// router.delete('/:id', authMidleware, deleteDepartment)

export default router