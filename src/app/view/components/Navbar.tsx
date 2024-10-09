// src/app/view/components/Navbar.tsx
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleLogout } from '../../utils/logout.js';

export default function Navbar() {
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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-xl font-bold">Admin Panel</div>
        <div>
          <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Home
          </Link>
          <Link href="/view/admin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Admin
          </Link>
          <Link href="/view/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Login
          </Link>
          <Link href="/view/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Register
          </Link>
          <Link href="/view/todo" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">
            Todo
          </Link>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
