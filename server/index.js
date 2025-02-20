import express from 'express'
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js';


connectToDatabase()
const app = express()
app.use(cors())
app.use(cors({
    origin: 'https://client-7p1bi4irl-utkarsh-ladlas-projects.vercel.app', // Allow only your frontend
    credentials: true
}));
app.use(express.json())
// app.use('/')
app.get('/', (req, res) => {
    res.send('Welcome to the HR Management API');
});

app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})





