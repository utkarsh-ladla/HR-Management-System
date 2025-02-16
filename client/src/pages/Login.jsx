// pages/Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth()
    const navigate = useNavigate();
    // const {login} =useAuth()
    const handleSubmit =async (e) => {
        e.preventDefault();
        // Perform login logic (API call)
        try {
          const response = await axios.post("https://hr-soltuion-server.vercel.app/",
            {email, password}
          )
          console.log(response.data);
            if(response.data.success) {
              console.log(response.data);
              // alert("successfully login")
              login(response.data.user)
              localStorage.setItem("token", response.data.token)
              if(response.data.user.role === "admin"){
               
                navigate("/admin-dashboard")
              } else{
                navigate("/employee-dashboard")
              }
            }
        } catch (error) {
          alert("Invalid email or password. Please try again");
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* Company Name Heading */}
            <h1 className="text-4xl font-bold font-Poppin text-blue-600 mb-8">HR Solutions</h1>
            
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center">
                    Don’t have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
