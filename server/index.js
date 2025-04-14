import express from 'express'
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js';
import attendanceRoutes from './models/Attendance.js';


connectToDatabase()
const app = express()
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend
    credentials: true
}));
app.use(express.json())
// app.use('/')
app.get('/', (req, res) => {
    res.send('Welcome to the HR Management API');
});

app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employees', employeeRouter);

app.use('/api/attendance', attendanceRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})





