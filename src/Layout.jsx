import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>

      {/* Footer - Always visible at bottom */}
      <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-4 mt-auto sticky bottom-0 z-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                Bharat Lunch
              </h3>
              <p className="text-gray-300 mb-2">
                Delicious authentic Indian meals
              </p>
              <p className="text-gray-300">Made with love and tradition</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/menu"
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    Menu
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-300">
                Contact Us
              </h3>
              <p className="text-gray-300 mb-2">📧 info@bharatlunch.com</p>
              <p className="text-gray-300 mb-2">📞 +1 (555) 123-4567</p>
              {/*<p className="text-gray-300">🏠 123 Food Street, Flavor City</p>*/}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-blue-600 mt-8 pt-4 text-center">
            <p className="text-gray-300">
              © 2025 Bharat Lunch. All rights reserved. Made with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
