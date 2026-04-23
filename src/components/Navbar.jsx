import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { baseURL } from "../api/api";

export default function Navbar({ settings }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const siteName = settings?.site_name || "Sadia Therapy";
  const siteTagline = settings?.site_tagline || settings?.tagline || "Solution-Focused Hypnotherapy";
  const logoSrc = settings?.logo_url
    || (settings?.admin_logo ? `${baseURL}storage/${settings.admin_logo}` : null)
    || (settings?.logo ? `${baseURL}storage/${settings.logo}` : null);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.hash === path;
  };

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/#packages", label: "Packages" },
    { to: "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <div className="flex items-center gap-3">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                ST
              </div>
            )}
            <div>
              <Link to="/" className="group">
                <div className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {siteName}
                </div>
                <div className="text-xs text-gray-500">
                  {siteTagline}
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-2 transition-colors nav-link ${
                  isActive(link.to) ? "text-purple-700" : "text-gray-600 hover:text-purple-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/appointment"
              className="ml-2 inline-block px-5 py-2.5 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-full text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Appointment
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <span className={`block h-0.5 w-full bg-gray-700 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-gray-700 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-full bg-gray-700 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="pb-4 pt-2 space-y-1 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-purple-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/appointment"
              onClick={closeMenu}
              className="block mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-purple-700 to-pink-600 text-white rounded-lg text-sm font-semibold text-center shadow-md"
            >
              Appointment
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}