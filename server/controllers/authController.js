import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();  // This will load the environment variables from the .env file

const login =async(req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({success: false, error: "user not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
             res.status(404).json({success: false, error: "Wrong password"})

        }

        const token = jwt.sign({_id: user._id, role: user.role },
            process.env.JWT_KEY, {expiresIn: "10d"}
        )

        res.status(200).json({success: true, token, user: {id: user._id, name: user.name, role: user.role}})
    } catch (error) {
        console.log(error)
    }
}

const verify =(req, res) => {
    return res.status(200).json({success: true, user: req.user})
}


export {login, verify};