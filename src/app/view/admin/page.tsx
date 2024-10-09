"use client";
import React, { useState, useEffect } from 'react';
import AdminNotification from '../components/AdminNotification';
import Layout from '../components/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage() {
  const [message, setMessage] = useState<string>(''); // State for the message
  const [tasks, setTasks] = useState<any[]>([]); // State for tasks
  const [users, setUsers] = useState<any[]>([]); // State for users

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks'); // Update with your actual endpoint
      if (response.ok) {
        const data = await response.json();
        setTasks(data); // Set the tasks data
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('An error occurred while fetching tasks', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/regusers'); // Update with your actual endpoint
      if (response.ok) {
        const data = await response.json();
        setUsers(data); // Set the users data
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('An error occurred while fetching users', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) {
      toast.error('Message cannot be empty', {
        position: 'top-right',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        toast.success('Message sent successfully!', {
          position: 'top-right',
        });
        setMessage(''); // Clear the input field
      } else {
        toast.error('Failed to send message', {
          position: 'top-right',
        });
      }
    } catch (error) {
      toast.error('An error occurred while sending the message', {
        position: 'top-right',
      });
    }
  };

  const handleDeleteUser = async (userId: number) => { // Explicitly define the type for userId
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('User deleted successfully!', {
            position: 'top-right',
          });
          fetchUsers(); // Refresh the user list
        } else {
          toast.error('Failed to delete user', {
            position: 'top-right',
          });
        }
      } catch (error) {
        toast.error('An error occurred while deleting the user', {
          position: 'top-right',
        });
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex flex-grow">
          {/* Main Content Area */}
          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-gray-700 mt-2">Manage all your content and settings from here</p>
            </div>

            {/* Admin Notification */}
            <AdminNotification />

            {/* Summary Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-black mb-4">Dashboard Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-600">Total Tasks: {tasks.length}</h3>
                  {/* Optionally display a list of tasks */}
                  <ul className="list-disc pl-5 mt-2 text-gray-800">
                    {tasks.map(task => (
                      <li key={task.id} className="hover:text-blue-600">{task.title}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-green-600">Registered Users: {users.length}</h3>
                  {/* Optionally display a list of users */}
                  <ul className="list-disc pl-5 mt-2 text-gray-800">
                    {users.map(user => (
                      <li key={user.id} className="flex justify-between items-center hover:text-green-600">
                        <span>{user.email}</span>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Message Sending Form */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-black mb-4">Send Admin Message</h2>
              <form onSubmit={handleSendMessage}>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

          </main>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
}
