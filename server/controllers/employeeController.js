import Employee from "../models/Employee.js"
import multer from 'multer'
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from "path"

// for uploading IMG
const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const addEmpolyee = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);
        
    const {
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
    } = req.body;

    const user = await User.findOne({email})
    // already registerd user or employee
    if(user){
        return res.status(400).json({success: false, error: "User already registered in emp"});

    }
    //If not then hash password and register new user 
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name,
        email,
        password : hashPassword,
        role,
        profileImage: req.file ? req.file.filename : ""
        
    })
    const saveUser = await newUser.save()

    const newEmploye = new Employee({
        userId: saveUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
    })

    await newEmploye.save()
    return res.status(200).json({success: true, message: "employee created"})
            
} catch (error) {
        return res.status(500).json({success: false, error: "server error in adding employee" })
}
}
export{addEmpolyee, upload}