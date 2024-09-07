import { useState } from "react";
import logo from "../assets/safescape_100x100.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 m-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center text-2xl font-bold">
        <img className="rounded-full size-12" src={logo} alt="" />
        <a href="/" className="hidden md:block">
          Safe<b className="font-bold text-red-600">Scape</b>
        </a>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden space-x-4 md:flex md:items-center">
        <a href="/login" className="nav-link">
          Dashboard
        </a>
        <a
          href="/login"
          className="px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-700">
          Login
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <div className="hamburger-icon space-y-1.5">
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="absolute top-0 left-0 w-64 h-full px-6 py-4 bg-white rounded-r-lg shadow-md">
          <button onClick={toggleMenu} className="mb-8 focus:outline-none">
            <div className="hamburger-icon space-y-1.5">
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </div>
          </button>
          <nav className="flex flex-col space-y-4">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
            <a
              href="/login"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
              Login
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
