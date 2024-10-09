// src/app/view/components/Layout.tsx
import React, { ReactNode } from 'react'; // Import React and ReactNode
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode; // Define the type for children
}

export default function Layout({ children }: LayoutProps) { // Specify the type for children in the function parameter
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} Your Company
      </footer>
    </div>
  );
}
