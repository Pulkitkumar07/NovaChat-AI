import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 absolute text-white px-5 py-3 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">NovaChat AI</h1>
        </div>

        {/* Mobile menu button (right) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen((s) => !s)}
          aria-label="toggle menu"
        >
          ☰
        </button>

        {/* CENTER capsule (desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-800 px-3 py-1 rounded-full flex gap-4 items-center shadow-sm">
            <Link to="/" className="px-3 py-2 rounded-full hover:bg-gray-700">Home</Link>
            <Link to="/register" className="px-3 py-2 rounded-full hover:bg-gray-700">Register</Link>
            
          </div>
        </div>

        {/* Desktop right (optional space to keep balance) */}
        <div className="hidden md:block" /> 
      </div>

      {/* MOBILE capsule (shows when screen small) */}
      <div className="md:hidden mt-3">
        {/* If you want capsule always visible on mobile, uncomment next block and remove toggle logic */}
        <div className="flex justify-center">
          <div className="bg-gray-800 w-full max-w-sm mx-4 px-3 py-1 rounded-full flex justify-between items-center gap-2">
            <Link to="/" className="flex-1 text-center py-2 rounded-full hover:bg-gray-700">Home</Link>
            <Link to="/register" className="flex-1 text-center py-2 rounded-full hover:bg-gray-700">Register</Link>
           
          </div>
        </div>

       
      </div>
    </nav>
  );
};

export default Nav;
