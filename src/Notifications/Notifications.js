"use client";
// src/Notifications.js

import React, { useEffect, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.Pusher = Pusher;

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("http://localhost:8000/api/messages");
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();

    const echo = new Echo({
      broadcaster: "pusher",
      key: "your-app-key",
      cluster: "mt1",
      encrypted: true,
    });

    echo.channel("admin-messages").listen("AdminMessageSent", (e) => {
      // Save the message to the local state
      setMessages((prevMessages) => [...prevMessages, e.message]);

      // Show a toast notification
      toast.info(`New message: ${e.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    return () => {
      echo.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black mb-4">Admin Messages</h2>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-lg shadow-lg flex flex-col items-start transition-transform duration-300 hover:scale-105 mx-auto max-w-md"
          >
            <div className="flex-1 mb-2">
              <p className="text-white font-semibold">{msg.message}</p>
            </div>
            <button
              className="self-end text-white bg-blue-700 hover:bg-blue-800 rounded-full px-3 py-1 text-sm"
              onClick={() => {
                // Implement action for message button if necessary
                toast.success(`Admin Message: ${msg.message}`);
              }}
            >
              Action
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notifications;
