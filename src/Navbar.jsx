import React from "react";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/pacifico";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              🍽️ Bharat Lunch
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-blue-700 text-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300"
              }`}
            >
              About
            </Link>
            <Link
              to="/menu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/menu")
                  ? "bg-blue-700 text-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300"
              }`}
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "bg-blue-700 text-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
