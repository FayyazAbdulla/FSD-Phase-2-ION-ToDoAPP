"use client"; // Marking it as a Client Component
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "../components/UserNav";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the password and confirmation match
    if (password !== passwordConfirmation) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Passwords do not match.",
      });
      return; // Exit the function to prevent submission
    }

    try {
      console.log("Submitting registration form...");

      const requestBody = {
        username,
        email,
        password,
      };

      console.log("Request body:", requestBody); // Log the request body

      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Handle the response from the server
      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data); // Log successful registration

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Registration successful!",
        });
        router.push('/view/login');
      } else {
        // For 4xx or 5xx responses
        const errorData = await response.json();
        console.error("Registration failed with status:", response.status);
        console.error("Error response body:", errorData); // Log the error response

        // Display the specific error from the backend or a fallback message
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorData.message || "Registration failed. Please try again.",
        });
      }
    } catch (err) {
      // Handle network or unexpected errors
      console.error("Error during registration:", err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred during registration. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <UserNavbar/>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        <form className="space-y-6 text-black" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/view/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
