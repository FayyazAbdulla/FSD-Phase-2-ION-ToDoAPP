// src/app/view/components/Navbar.tsx
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleLogout } from '../../utils/logout.js';

export default function UserNavbar() {
  const router = useRouter();
  
  const onLogout = async () => {
    const success = await handleLogout(); // Call the logout function
    if (success) {
      router.push('/view/login'); // Redirect to login page
    } else {
      alert('Logout failed!'); // Handle logout failure
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Brand */}
        <div className="text-white text-2xl font-bold tracking-wide">ToDo App</div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out">
            Home
          </Link>
          <Link href="/view/login" className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out">
            Login
          </Link>
          <Link href="/view/register" className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out">
            Register
          </Link>
          <Link href="/view/todo" className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded transition duration-300 ease-in-out">
            Todo
          </Link>
          
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
