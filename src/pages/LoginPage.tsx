import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: authentication logic
    navigate("/homepage"); // redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Please log in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* email and password inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="my-6 border-t border-gray-200" />
        <p className="text-sm text-gray-500 text-center">
          No account yet?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;