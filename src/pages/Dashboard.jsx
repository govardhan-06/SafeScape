import { Link, Route, Routes, useLocation, Navigate } from "react-router-dom";
import HeaderDash from "../components/HeaderDash";
import Speedometer from "../components/Safemeter";
import Logs from "../components/Logs";
import UserLocationMap from "../components/Map";
import PastAlerts from "../components/PastAlerts";
import CameraData from "../components/CameraData"; // Fetch camera data from Supabase

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
          <div className="flex items-center h-16 py-2 space-x-6 bg-white rounded-lg justify-evenly">
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
            {/* Fetch camera data dynamically */}
            <Routes>
              <Route
                path="camera1"
                element={
                  <CameraData cameraName="camera1">
                    {({ safetymeter }) => (
                      <>
                        <Speedometer percentage={safetymeter} />
                        <Logs />
                        {/* <UserLocationMap lat={latitude} lon={longitude} /> */}
                      </>
                    )}
                  </CameraData>
                }
              />
              <Route
                path="camera2"
                element={
                  <CameraData cameraName="camera2">
                    {({ safetymeter }) => (
                      <>
                        <Speedometer percentage={safetymeter} />
                        <Logs />
                        {/* <UserLocationMap lat={latitude} lon={longitude} /> */}
                      </>
                    )}
                  </CameraData>
                }
              />
              <Route
                path="camera3"
                element={
                  <CameraData cameraName="camera3">
                    {({ safetymeter }) => (
                      <>
                        <Speedometer percentage={safetymeter} />
                        <Logs />
                        {/* <UserLocationMap lat={latitude} lon={longitude} /> */}
                      </>
                    )}
                  </CameraData>
                }
              />
              <Route
                path="camera4"
                element={
                  <CameraData cameraName="camera4">
                    {({ safetymeter }) => (
                      <>
                        <Speedometer percentage={safetymeter} />
                        <Logs />
                        {/* <UserLocationMap lat={latitude} lon={longitude} /> */}
                      </>
                    )}
                  </CameraData>
                }
              />
              {/* Default Route Redirect */}
              <Route path="/" element={<Navigate to="/dashboard/camera1" />} />
            </Routes>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col mt-4 space-y-4 lg:mt-0 lg:w-1/3">
          {/* Top Right Rectangle */}
          <div className="p-4 bg-white rounded-lg h-1/2">
            <PastAlerts alerts={sampleAlerts} />
          </div>
          <div className="bg-white rounded-lg h-1/2">
            {/* <UserLocationMap></UserLocationMap> */}

            <Routes>
              <Route
                path="camera1"
                element={
                  <CameraData cameraName="camera1">
                    {({ latitude, longitude }) => (
                      <UserLocationMap lat={latitude} lon={longitude} />
                    )}
                  </CameraData>
                }
              />
              <Route
                path="camera2"
                element={
                  <CameraData cameraName="camera2">
                    {({ latitude, longitude }) => (
                      <UserLocationMap lat={latitude} lon={longitude} />
                    )}
                  </CameraData>
                }
              />
              <Route
                path="camera3"
                element={
                  <CameraData cameraName="camera3">
                    {({ latitude, longitude }) => (
                      <UserLocationMap lat={latitude} lon={longitude} />
                    )}
                  </CameraData>
                }
              />
              <Route
                path="camera4"
                element={
                  <CameraData cameraName="camera4">
                    {({ latitude, longitude }) => (
                      <UserLocationMap lat={latitude} lon={longitude} />
                    )}
                  </CameraData>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
