import React from "react";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/pacifico";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-amber-600 to-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-5xl font-bold text-yellow-300 text-shadow-lg hover:text-yellow-600 transition-colors"
              style={{
                fontFamily: "Copperplate, Papyrus, fantasy",
              }}
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
                  ? "bg-yellow-300 text-blue-900 border border-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300 border border-yellow-300"
              }`}
            >
              About
            </Link>
            <Link
              to="/menu"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/menu")
                  ? "bg-yellow-300 text-blue-900 border border-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300 border border-yellow-300"
              }`}
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/contact")
                  ? "bg-yellow-300 text-blue-900 border border-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300 border border-yellow-300"
              }`}
            >
              Contact
            </Link>
            <Link
              to="/signin"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/signin")
                  ? "bg-yellow-300 text-blue-900 border border-yellow-300"
                  : "text-white hover:bg-blue-700 hover:text-yellow-300 border border-yellow-300"
              }`}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
