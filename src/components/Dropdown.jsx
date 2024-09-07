import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";
import Logout from "./Logout";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setIsOpen(false);
    // Perform logout action here (e.g., clearing session or tokens)
    navigate("/login");
  };

  return (
    <div className="relative inline-block text-left">
      <img
        className="size-10 hover:cursor-pointer"
        src={profile}
        alt=""
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute right-0 w-48 mt-6 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={handleProfile}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900">
              <Logout />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
