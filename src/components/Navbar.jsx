import { useState } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">
              ST
            </div>
            <div>
              <div className="text-lg font-semibold">Sadia Therapy</div>
              <div className="text-xs text-gray-500">
                Solution-Focused Hypnotherapy
              </div>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-purple-700 py-2">Home</Link>
            {/* <a href="#services" className="hover:text-purple-700 py-2">Services</a> */}
            <Link to="/#packages" className="hover:text-purple-700 py-2">Packages</Link>
            <Link to="/#contact" className="hover:text-purple-700 py-2">Contact</Link>
            <Link
              to="/appointment"
              className="ml-4 inline-block px-4 py-2 bg-purple-700 text-white rounded-full text-sm"
            >
              Appointment
            </Link>
          </nav>

          <button
            className="md:hidden p-2 bg-gray-100 rounded"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#services" className="block">Home</a>
            <a href="#packages" className="block">Packages</a>
            <a href="#contact" className="block">Contact</a>
            {/* <a href="#book" className="ml-4 inline-block px-4 py-2 bg-purple-700 text-white rounded-full text-sm">Appointment</a> */}
          </div>
        )}
      </div>
    </header>
  );
}