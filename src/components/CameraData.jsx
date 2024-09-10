import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient"; // import your Supabase client

const CameraData = ({ cameraName, children }) => {
  const [data, setData] = useState({
    safetymeter: 0,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("cameras")
        .select("safetymeter, latitude, longitude")
        .eq("name", cameraName)
        .single(); // fetch single row where name matches cameraName

      if (error) {
        console.error("Error fetching camera data: ", error);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, [cameraName]);

  return children(data);
};

export default CameraData;
