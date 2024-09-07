import supabase from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Logout = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logout = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    }

    if (!error) {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Logout;
