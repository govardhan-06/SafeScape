import { Link, Route, Routes, useLocation, Navigate } from "react-router-dom";
import HeaderDash from "../components/HeaderDash";
import Speedometer from "../components/Safemeter";
import Logs from "../components/Logs";
import UserLocationMap from "../components/Map";
import PastAlerts from "../components/PastAlerts";

const sampleAlerts = [
  {
    type: "Critical",
    time: "2024-09-01 14:32",
    message: "Unauthorized entry detected",
  },
  {
    type: "Warning",
    time: "2024-09-01 13:20",
    message: "High temperature alert",
  },
  { type: "Info", time: "2024-08-31 12:50", message: "System rebooted" },
  {
    type: "Critical",
    time: "2024-08-31 11:10",
    message: "Motion detected in restricted area",
  },
  {
    type: "Warning",
    time: "2024-08-30 09:15",
    message: "System overheat warning",
  },
];

const Dashboard = () => {
  const location = useLocation();

  // Check if the current route matches a camera route
  const isActive = (camera) => location.pathname === `/dashboard/${camera}`;

  return (
    <>
      <HeaderDash />
      <div className="flex flex-col h-screen px-4 pb-4 lg:space-x-4 lg:flex-row ">
        {/* Left Column */}
        <div className="flex flex-col space-y-4 lg:w-2/3">
          {/* Top Horizontal Rectangle for Cameras */}
          <div className="flex items-center h-16 space-x-6 bg-white rounded-lg justify-evenly">
            {["camera1", "camera2", "camera3", "camera4"].map(
              (camera, index) => (
                <Link
                  key={index}
                  to={`/dashboard/${camera}`}
                  className={`px-2 py-1 font-semibold rounded-full hover:cursor-pointer ${
                    isActive(camera)
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-200"
                  }`}>
                  Camera {index + 1}
                </Link>
              )
            )}
          </div>
          {/* Large Left Rectangle */}
          <div className="flex-col flex-1 bg-white rounded-lg">
            <Speedometer percentage={95} />{" "}
            {/* Speedometer Component, vary percentage based on route */}
            <Logs />
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col mt-4 space-y-4 lg:mt-0 lg:w-1/3">
          {/* Top Right Rectangle */}
          <div className="p-4 bg-white rounded-lg h-1/2">
            <PastAlerts alerts={sampleAlerts} />
          </div>
          {/* Bottom Right Rectangle */}
          <div className="bg-white rounded-lg h-1/2">
            <UserLocationMap /> {/* Map Component, add lat and long */}
          </div>
        </div>
      </div>

      {/* Camera Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/camera1" />} />
        <Route path="camera1" element={<div>Camera 1 View</div>} />
        <Route path="camera2" element={<div>Camera 2 View</div>} />
        <Route path="camera3" element={<div>Camera 3 View</div>} />
        <Route path="camera4" element={<div>Camera 4 View</div>} />
      </Routes>
    </>
  );
};

export default Dashboard;
