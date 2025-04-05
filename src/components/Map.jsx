// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
// import L from "leaflet"; // Leaflet for marker fix
// import PropTypes from "prop-types";

// // Fix for default marker icon not showing up
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const UserLocationMap = ({ lat, lon }) => {
//   console.log("hello");
//   console.log(lat);
//   console.log(lon);

//   const [position, setPosition] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition([latitude, longitude]);
//         },
//         (err) => {
//           setError("Location access denied or unavailable.");
//           console.error(err);
//         },
//         { enableHighAccuracy: true }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   return (
//     <div className="w-full h-full p-4 ">
//       {position ? (
//         <MapContainer
//           center={position}
//           zoom={13}
//           scrollWheelZoom={true}
//           className="w-full h-full">
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={position}>
//             <Popup>
//               You are here: <br /> {position[0].toFixed(4)},{" "}
//               {position[1].toFixed(4)}
//             </Popup>
//           </Marker>
//         </MapContainer>
//       ) : error ? (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-red-500">{error}</p>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center h-full">
//           <p>Locating...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// UserLocationMap.propTypes = {
//   lat: PropTypes.number,
//   lon: PropTypes.number,
// };

// export default UserLocationMap;
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // Leaflet for marker fix
import PropTypes from "prop-types";

// Fix for default marker icon not showing up
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Helper component to update map view
const MapUpdater = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], map.getZoom(), {
        animate: true,
      });
    }
  }, [lat, lon, map]);

  return null;
};

const UserLocationMap = ({ lat, lon }) => {
  // Check if lat and lon are valid
  const isValidLatLon =
    typeof lat === "number" &&
    typeof lon === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180;

  return (
    <div className="w-full h-full p-4">
      {isValidLatLon ? (
        <MapContainer
          center={[lat, lon]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lon]}>
            <Popup>
              Location: <br /> {lat.toFixed(4)}, {lon.toFixed(4)}
            </Popup>
          </Marker>
          {/* Component to update the map view */}
          <MapUpdater lat={lat} lon={lon} />
        </MapContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">
            Invalid latitude or longitude provided.
          </p>
        </div>
      )}
    </div>
  );
};

UserLocationMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

MapUpdater.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default UserLocationMap;
