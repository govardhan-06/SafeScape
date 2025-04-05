import HeaderDash from "../components/HeaderDash";

import { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";

const Profile = () => {
  const [profile, setProfile] = useState(null); // Stores the profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  // Function to fetch the current user's profile from Supabase
  const fetchProfile = async () => {
    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("Error fetching user or user not logged in.");
      setLoading(false);
      return;
    }

    const userEmail = user.email;

    // Fetch profile info from 'profiles' table matching the user's email
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("email, first_name, last_name, badge_number, created_at")
      .eq("email", userEmail)
      .single();

    if (profileError) {
      setErrorMessage("Error fetching profile: " + profileError.message);
    } else {
      setProfile(profileData); // Set the profile data
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <HeaderDash></HeaderDash>
      <div className="flex justify-center ">
        {loading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          profile && (
            <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-center">
                Your Profile
              </h2>
              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <p className="p-2 mt-1 border border-gray-300 rounded-lg">
                  {profile.email}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  First Name
                </label>
                <p className="p-2 mt-1 border border-gray-300 rounded-lg">
                  {profile.first_name}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Last Name
                </label>
                <p className="p-2 mt-1 border border-gray-300 rounded-lg">
                  {profile.last_name}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Badge Number
                </label>
                <p className="p-2 mt-1 border border-gray-300 rounded-lg">
                  {profile.badge_number}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Created At
                </label>
                <p className="p-2 mt-1 border border-gray-300 rounded-lg">
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Profile;
