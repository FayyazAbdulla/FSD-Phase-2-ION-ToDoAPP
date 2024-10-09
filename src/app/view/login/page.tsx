"use client"; // Marking it as a Client Component
import React, { useState } from "react";
import UserNavbar from "../components/UserNav";
import { loginHandler } from "./loginHandler.ts"; // Import the loginHandler
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Get router instance here

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // for testing 
    console.log("Form submission started"); // Log form submission start
    console.log("Email: ", email); // Log the email entered
    console.log("Password: [PROTECTED]"); // For security, don’t log the actual password

    // Call the loginHandler function and pass router
    await loginHandler(email, password, setError, router);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <UserNavbar />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email} // Bind value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password} // Bind value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/view/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
