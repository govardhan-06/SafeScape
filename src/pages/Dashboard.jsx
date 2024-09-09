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
  return (
    <>
      <HeaderDash></HeaderDash>
      <div className="flex flex-col h-screen px-4 pb-4 lg:space-x-4 lg:flex-row ">
        {/* Left Column */}
        <div className="flex flex-col space-y-4 lg:w-2/3">
          {/* Top Horizontal Rectangle (spans only the left column) */}
          <div className="flex items-center h-16 space-x-6 bg-white rounded-lg justify-evenly">
            <span className="px-2 py-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer ">
              Camera 1
            </span>
            <span className="px-2 py-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer ">
              Camera 2
            </span>
            <span className="px-2 py-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer ">
              Camera 3
            </span>
            <span className="px-2 py-1 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer ">
              Camera 4
            </span>
          </div>
          {/* Large Left Rectangle */}
          <div className="flex-col flex-1 bg-white rounded-lg">
            <Speedometer percentage={95} />
            <Logs></Logs>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col mt-4 space-y-4 lg:mt-0 lg:w-1/3">
          {/* Top Right Rectangle */}
          <div className="p-4 bg-white rounded-lg h-1/2">
            <PastAlerts alerts={sampleAlerts}></PastAlerts>
          </div>
          {/* Bottom Right Rectangle */}
          <div className="bg-white rounded-lg h-1/2">
            <UserLocationMap></UserLocationMap>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
