import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient"; // Adjust the import as necessary

const PastAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  // Fetch data from Supabase with intensity "high"
  useEffect(() => {
    const fetchHighIntensityAlerts = async () => {
      const { data, error } = await supabase
        .from("hist")
        .select("*")
        .eq("intensity", "high") // Filter for high intensity alerts
        .order("created_at", { ascending: false }); // Most recent first

      if (error) {
        console.error("Error fetching high intensity alerts:", error);
      } else {
        setAlerts(data);
      }
    };

    fetchHighIntensityAlerts();
  }, []);

  return (
    <div className="w-full h-full text-sm">
      <div className="overflow-y-auto h-72">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-red-100 ">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Timestamp</th>
              <th className="px-4 py-2 border-b">Intensity</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Type</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <tr key={alert.created_at} className="hover:bg-red-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(alert.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">{alert.intensity}</td>
                <td className="px-4 py-2 border-b">{alert.location}</td>
                <td className="px-4 py-2 border-b">{alert.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 overflow-y-auto max-h-80">
        {/* Optional extra content */}
      </div>
    </div>
  );
};

export default PastAlerts;
