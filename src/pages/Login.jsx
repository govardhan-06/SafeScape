import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false); // State to manage pop-up message

  const updateLoginState = () => {
    setIsLoggedIn((prev) => !prev);
  };

  // Email validation function using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const auth = async (e) => {
    e.preventDefault();

    // Check if email is valid
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    let { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });

    if (data) {
      // Display pop-up message on successful request
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate("/", { replace: true });
      }, 10000); // Redirect after 2 seconds
    }

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        className="flex border-2 border-black bg-gray-200 p-4 rounded-xl w-[50%] flex-col items-center justify-center space-y-4 m-4"
        onSubmit={auth}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg"
        />
        <button className="px-4 py-2 bg-green-400 rounded-xl">
          {isLoggedIn ? "Login" : "Sign up"}
        </button>
        <span className="hover:cursor-pointer" onClick={updateLoginState}>
          {isLoggedIn
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </span>
        {error && <p className="text-red-500">{error}</p>}
        {showMessage && (
          <p className="text-green-500">Check your inbox to log in securely.</p>
        )}
      </form>
    </div>
  );
};

export default Login;
