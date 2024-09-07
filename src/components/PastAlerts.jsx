import PropTypes from "prop-types";

const PastAlerts = ({ alerts }) => {
  // Rest of the code

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="pb-2 text-xl font-semibold text-center ">Past Alerts</div>
      <div className="grid grid-cols-3 gap-4 p-4 font-semibold bg-gray-200 border-b-2 border-gray-400">
        <span>Alert Type</span>
        <span>Time</span>
        <span>Message</span>
      </div>
      <div>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-4 border-b border-gray-300 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}>
              <span>{alert.type}</span>
              <span>{alert.time}</span>
              <span>{alert.message}</span>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">No alerts available</div>
        )}
      </div>
    </div>
  );
};

PastAlerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

export default PastAlerts;
