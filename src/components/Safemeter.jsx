import ReactSpeedometer from "react-d3-speedometer";

import PropTypes from "prop-types";

const Speedometer = ({ percentage }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg ">
      <h2 className="text-xl font-bold">Safetymeter</h2>

      {/* Speedometer component */}
      <ReactSpeedometer
        maxValue={100}
        value={percentage}
        needleColor="red"
        startColor="#00ff00"
        segments={10}
        endColor="#ff0000"
        width={300}
        height={175}
        needleTransitionDuration={2000}
        needleTransition="easeElastic"
        customSegmentStops={[0, 25, 50, 75, 100]}
        currentValueText={`Fill Level: ${percentage}%`}
        textColor="#000000"
      />
    </div>
  );
};

Speedometer.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Speedometer;
