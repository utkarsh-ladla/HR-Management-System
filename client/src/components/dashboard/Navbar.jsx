import React from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-800 text-white p-4 fixed top-0 w-full flex justify-between items-center shadow-lg z-10">
      {/* Left Section: HR Solutions and Welcome User */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">
          HR Solutions
        </div>
        <span className="text-lg">Welcome, {user?.name || 'User'}</span>
      </div>

      {/* Right Section: Logout Button */}
      <div>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
