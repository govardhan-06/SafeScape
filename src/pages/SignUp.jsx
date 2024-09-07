import { useState } from "react";
import supabase from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [badgeNumber, setBadgeNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle authentication
  const auth = async () => {
    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (error) {
      setErrorMessage(error.message);
      return false;
    } else {
      setSuccessMessage("Check your inbox to log in securely.");
      return true;
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!firstName || !lastName || !badgeNumber || !email) {
      setErrorMessage("Please fill in all fields.");
      return false;
    }

    // Insert data into Supabase
    const { error } = await supabase.from("profiles").insert([
      {
        first_name: firstName,
        last_name: lastName,
        badge_number: badgeNumber,
        email: email,
      },
    ]);

    if (error) {
      setErrorMessage("Failed to create user: " + error.message);
      return false;
    } else {
      setSuccessMessage(
        "Your profile was created. Check your inbox for the login link."
      );
      // Clear form fields
      setFirstName("");
      setLastName("");
      setBadgeNumber("");
      setEmail("");
      return true;
    }
  };

  const functionCaller = async (e) => {
    e.preventDefault();

    // Clear error message on new submission
    setErrorMessage("");

    // First perform auth and then insert the data if auth succeeds
    const authSuccess = await auth();
    if (authSuccess) {
      const submissionSuccess = await handleSubmit();
      if (submissionSuccess) {
        // Show success message for 2 seconds and then redirect
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={functionCaller}
        className="w-full max-w-lg p-6 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-center">Signup</h2>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* First Name Field */}
        <div>
          <label
            htmlFor="first-name"
            className="block font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label
            htmlFor="last-name"
            className="block font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Enter your last name"
          />
        </div>

        {/* Badge Number Field */}
        <div>
          <label
            htmlFor="badge-number"
            className="block font-medium text-gray-700">
            Badge Number
          </label>
          <input
            type="text"
            id="badge-number"
            value={badgeNumber}
            onChange={(e) => setBadgeNumber(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            placeholder="Enter your badge number"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-700">
          Sign Up
        </button>

        <a className="block text-center hover:font-semibold" href="/login">
          Already have an account? <u>Login</u>
        </a>
      </form>
    </div>
  );
};

export default Signup;
