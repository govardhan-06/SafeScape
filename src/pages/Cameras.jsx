import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import supabase from "../config/SupabaseClient";
import HeaderDash from "../components/HeaderDash";

// Icons for camera status
const StatusIcon = ({ status }) => {
  return (
    <div className="absolute top-2 right-2">
      {status == "true" ? (
        <div className="bg-green-500 rounded-full size-4" title="Active"></div>
      ) : (
        <div className="bg-red-500 rounded-full size-4" title="Inactive"></div>
      )}
    </div>
  );
};

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

const Cameras = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const { data, error } = await supabase
          .from("cameras")
          .select("created_at, cam_id, name, latitude, longitude, status");

        if (error) throw error;
        setCameras(data);
      } catch (err) {
        setError("Failed to fetch cameras.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  if (loading) return <p>Loading cameras...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <HeaderDash />
      <div className="container p-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cameras.map((camera) => (
            <div
              key={camera.cam_id}
              className="relative p-4 bg-white border rounded-lg shadow-lg">
              {/* Status Icon */}
              <StatusIcon status={camera.status} />

              <h2 className="mb-2 text-lg font-bold">{camera.name}</h2>
              <p className="text-sm text-gray-600">
                Camera ID: {camera.cam_id}
              </p>
              <p className="text-sm text-gray-600">
                Latitude: {camera.latitude}
              </p>
              <p className="text-sm text-gray-600">
                Longitude: {camera.longitude}
              </p>
              <p className="text-sm text-gray-500">
                Configured at: {new Date(camera.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cameras;
