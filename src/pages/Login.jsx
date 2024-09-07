import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useState } from "react";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
    <>
      <Header />
      <div className="flex items-center justify-center ">
        <form
          className="flex flex-col items-center justify-center w-1/3 p-4 m-4 space-y-4 bg-white rounded-xl"
          onSubmit={auth}>
          {isLoggedIn ? (
            <label htmlFor="email" className="text-2xl font-semibold">
              Login
            </label>
          ) : (
            <label htmlFor="email" className="text-2xl font-semibold">
              SignUp
            </label>
          )}
          <input
            type="email"
            id="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-2 border-black rounded-lg"
          />
          <button className="px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-700">
            {isLoggedIn ? "Login" : "Sign up"}
          </button>
          <span
            className="hover:cursor-pointer hover:font-semibold"
            onClick={updateLoginState}>
            {isLoggedIn ? (
              <span>
                Don&apos;t have an account? <u>SignUp</u>
              </span>
            ) : (
              <span>
                Already have an account? <u>Login</u>
              </span>
            )}
          </span>
          {error && <p className="text-red-500">{error}</p>}
          {showMessage && (
            <p className="text-green-500">
              Check your inbox to log in securely.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
