import { useState } from "react";
import logo from "../assets/safescape_100x100.png";
import profile from "../assets/profile.png";
import notification from "../assets/notification.png";
import Dropdown from "../components/Dropdown";
import Notifications from "./Notifications";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 m-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center text-2xl font-bold">
        <img className="rounded-full size-12" src={logo} alt="" />
        <a href="/">SafeScape</a>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden space-x-8 md:flex md:items-center">
        <a href="/dashboard" className="nav-link">
          Dashboard
        </a>
        <span className="text-white rounded-full hover:cursor-pointer">
          <Notifications></Notifications>
        </span>
        <span className="text-white rounded-full ">
          <Dropdown />
        </span>
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
          <button
            onClick={toggleMenu}
            className="flex items-center justify-between mb-8 focus:outline-none">
            <div className="hamburger-icon space-y-1.5">
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </div>
            <a href="/profile" className="px-4 py-2 text-white rounded ">
              <img className="rounded-full size-10" src={profile} alt="" />
            </a>
            <a href="/" className="px-4 py-2 text-white rounded ">
              <img className="rounded-full size-10" src={notification} alt="" />
            </a>
          </button>
          <nav className="flex flex-col space-y-4">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
