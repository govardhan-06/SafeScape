import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import PropTypes from "prop-types";
import HeaderDash from "../components/HeaderDash";

const Cameras = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const { data, error } = await supabase
          .from("cameras")
          .select("created_at, cam_id, name, latitude, longitude");

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
      <HeaderDash></HeaderDash>
      <div className="container p-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cameras.map((camera) => (
            <div
              key={camera.cam_id}
              className="p-4 bg-white border rounded-lg shadow-lg">
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

Cameras.propTypes = {
  supabaseUrl: PropTypes.string,
  supabaseAnonKey: PropTypes.string,
};

export default Cameras;
