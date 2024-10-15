import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not provided" })
        }
        const decorded = jwt.verify(token, process.env.JWT_KEY)
        if (!decorded) {
            return res.status(404).json({ success: false, error: "Token Not provided" })
        }

        const user = await User.findById({ _id: decorded._id }).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, error: "User was not found" })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" })
    }
};


export default verifyUser