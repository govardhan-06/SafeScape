import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient"; // Adjust the import as necessary

const Logs = () => {
  const [logs, setLogs] = useState([]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("hist")
        .select("*")
        .order("created_at", { ascending: false }); // Order by most recent first

      if (error) {
        console.error("Error fetching logs:", error);
      } else {
        setLogs(data);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="w-full p-4 ">
      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="sticky top-0 bg-gray-100">
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Timestamp</th>
              <th className="px-4 py-2 border-b">Intensity</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Type</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.created_at} className="hover:bg-gray-50">
                <td className="py-2 border-b px-11">{index + 1}</td>
                <td className="py-2 border-b px-11">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="py-2 border-b px-11">{log.intensity}</td>
                <td className="py-2 border-b px-11">{log.location}</td>
                <td className="py-2 border-b px-11">{log.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
