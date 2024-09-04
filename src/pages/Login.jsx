import { useState } from "react";
import Header from "../components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    setError("");
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <Header></Header>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-center">Login/SignUp</h2>
          {isSubmitted && (
            <div className="p-4 mb-4 text-blue-800 bg-blue-100 rounded">
              <p>Check your inbox to log in securely.</p>
            </div>
          )}
          {error && (
            <div className="p-4 mb-4 text-red-800 bg-red-100 rounded">
              <p>{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
