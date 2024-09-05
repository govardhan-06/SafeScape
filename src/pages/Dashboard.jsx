import HeaderDash from "../components/HeaderDash";

const Dashboard = () => {
  return (
    <>
      <HeaderDash></HeaderDash>
      <div className="flex h-screen px-4 py-2 space-x-4">
        {/* Left Column */}
        <div className="flex flex-col w-2/3 space-y-4">
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
          <div className="flex-1 bg-white rounded-lg"></div>
        </div>
        {/* Right Column */}
        <div className="flex flex-col w-1/3 space-y-4">
          {/* Top Right Rectangle */}
          <div className="flex-1 bg-white rounded-lg"></div>
          {/* Bottom Right Rectangle */}
          <div className="flex-1 bg-white rounded-lg"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
