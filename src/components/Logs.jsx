const LogDisplay = () => {
  // Sample log data
  const logs = [
    {
      id: 1,
      time: "12:01 PM",
      user: "John",
      action: "Logged in",
      status: "Success",
    },
    {
      id: 2,
      time: "12:05 PM",
      user: "Doe",
      action: "Logged out",
      status: "Success",
    },
    {
      id: 3,
      time: "12:10 PM",
      user: "Alice",
      action: "Failed login",
      status: "Failed",
    },
    {
      id: 4,
      time: "12:12 PM",
      user: "Bob",
      action: "Password change",
      status: "Success",
    },
    {
      id: 5,
      time: "12:14 PM",
      user: "Eve",
      action: "Login attempt",
      status: "Failed",
    },
    {
      id: 6,
      time: "12:18 PM",
      user: "John",
      action: "Logged out",
      status: "Success",
    },
    {
      id: 6,
      time: "12:18 PM",
      user: "John",
      action: "Logged out",
      status: "Success",
    },
    {
      id: 6,
      time: "12:18 PM",
      user: "John",
      action: "Logged out",
      status: "Success",
    },
    {
      id: 6,
      time: "12:18 PM",
      user: "John",
      action: "Logged out",
      status: "Success",
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="overflow-y-auto max-h-80">
        {/* Table header */}
        <div className="grid grid-cols-5 p-2 font-bold text-center bg-gray-300">
          <div>ID</div>
          <div>Time</div>
          <div>User</div>
          <div>Action</div>
          <div>Status</div>
        </div>

        {/* Log rows */}
        <div className="divide-y divide-gray-200">
          {logs.map((log) => (
            <div key={log.id} className="grid grid-cols-5 p-2 text-center">
              <div>{log.id}</div>
              <div>{log.time}</div>
              <div>{log.user}</div>
              <div>{log.action}</div>
              <div>{log.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogDisplay;
