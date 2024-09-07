import { useState } from "react";
import notification from "../assets/notification.png";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sampleNotifications = [
    "Alert: Unusual activity detected in your area.",
    "Reminder: Check your account settings.",
    "New feature: Real-time safety alerts.",
    "Update: Your safety zone has been updated.",
    "Message: Weekly safety tips are available.",
  ];

  return (
    <div className="relative inline-block text-left">
      <img
        className="size-6"
        onClick={() => setIsOpen(!isOpen)}
        src={notification}
      />

      {isOpen && (
        <div className="absolute right-0 w-64 mt-8 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-2" role="menu" aria-orientation="vertical">
            {sampleNotifications.map((notification, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {notification}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
