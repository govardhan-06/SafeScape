// import { useNavigate } from "react-router-dom";
// import supabase from "../config/SupabaseClient";
// import { useState } from "react";
// import Header from "../components/Header";
// import Signup from "./SignUp";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [error, setError] = useState(null);
//   const [showMessage, setShowMessage] = useState(false); // State to manage pop-up message

//   const updateLoginState = () => {
//     setIsLoggedIn((prev) => !prev);
//   };

//   // Email validation function using regex
//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const auth = async (e) => {
//     e.preventDefault();

//     // Check if email is valid
//     if (!isValidEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     let { data, error } = await supabase.auth.signInWithOtp({
//       email: email,
//     });

//     if (data) {
//       // Display pop-up message on successful request
//       setShowMessage(true);
//       setTimeout(() => {
//         setShowMessage(false);
//         navigate("/", { replace: true });
//       }, 5000); // Redirect after 5 seconds
//     }

//     if (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <Header />
//       {!isLoggedIn ? (
//         <Signup />
//       ) : (
//         <div className="flex items-center justify-center ">
//           <form
//             className="flex flex-col items-center justify-center p-4 m-4 space-y-4 bg-white md:w-1/3 rounded-xl"
//             onSubmit={auth}>
//             <label htmlFor="email" className="text-2xl font-semibold">
//               Login
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="user@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//             <button className="px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-700">
//               Login
//             </button>
//             <span
//               className="hover:cursor-pointer hover:font-semibold"
//               onClick={updateLoginState}>
//               <span>
//                 Don&apos;t have an account? <u>SignUp</u>
//               </span>
//             </span>
//             {error && <p className="text-red-500">{error}</p>}
//             {showMessage && (
//               <p className="text-green-500">
//                 Check your inbox to log in securely.
//               </p>
//             )}
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;

import { useNavigate } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import { useState } from "react";
import Header from "../components/Header";
import Signup from "./SignUp";

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

    try {
      // Check if the email exists in the profiles table
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email);

      if (profileError) {
        throw profileError;
      }

      if (profiles.length === 0) {
        // If no profile is found, show an error message
        setError("User not found in database, please signup first.");
        return;
      }

      // If the email exists, proceed with sending OTP
      const { data, error } = await supabase.auth.signInWithOtp({ email });

      if (data) {
        // Display pop-up message on successful request
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/", { replace: true });
        }, 5000); // Redirect after 5 seconds
      }

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      {!isLoggedIn ? (
        <Signup />
      ) : (
        <div className="flex items-center justify-center">
          <form
            className="flex flex-col items-center justify-center p-4 m-4 space-y-4 bg-white md:w-1/3 rounded-xl"
            onSubmit={auth}>
            <label htmlFor="email" className="text-2xl font-semibold">
              Login
            </label>
            <input
              type="email"
              id="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button className="px-4 py-2 font-bold text-white bg-purple-500 rounded-lg hover:bg-purple-700">
              Login
            </button>
            <span
              className="hover:cursor-pointer hover:font-semibold"
              onClick={updateLoginState}>
              <span>
                Don&apos;t have an account? <u>SignUp</u>
              </span>
            </span>
            {error && <p className="text-red-500">{error}</p>}
            {showMessage && (
              <p className="text-green-500">
                Check your inbox to log in securely.
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
