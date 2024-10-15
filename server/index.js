import express from 'express'
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToDatabase from './db/db.js';


connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})





