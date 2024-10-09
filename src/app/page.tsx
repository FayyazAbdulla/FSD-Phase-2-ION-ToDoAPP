import Notifications from "../Notifications/Notifications";
import UserNavbar from "./view/components/UserNav";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600 text-white">
      <UserNavbar />
      {/* Main content */}
      <div className="text-center space-y-6">
        {/* Header */}
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
          Welcome to ION Phase 2 Test - To-Do Manager
        </h1>

        {/* Tagline */}
        <p className="text-2xl font-medium max-w-xl mx-auto">
          Full Stack Web Application for managing tasks, authentication, and
          real-time admin messages.
        </p>

        {/* Features Overview */}
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 mt-8">
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            <h2 className="text-3xl font-bold">User Authentication</h2>
            <p className="mt-2 text-lg">
              Register and login with JWT-based authentication.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            <h2 className="text-3xl font-bold">To-Do List</h2>
            <p className="mt-2 text-lg">
              Manage your tasks with full CRUD functionality.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
            <h2 className="text-3xl font-bold">Admin Messages</h2>
            <p className="mt-2 text-lg">
              Receive real-time notifications and messages from the admin.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <a
            href="/view/register"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300"
          >
            Get Started
          </a>
        </div>
        <Notifications />
      </div>
    </div>
  );
}
