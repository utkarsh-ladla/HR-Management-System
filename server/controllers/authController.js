import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();  // This will load the environment variables from the .env file

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Wrong password" }); // 401 is more appropriate
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        return res.status(200).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

const verify =(req, res) => {
    return res.status(200).json({success: true, user: req.user})
}


export {login, verify};