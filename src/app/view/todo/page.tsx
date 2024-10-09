"use client";

import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import UserNavbar from "../components/UserNav";
import { fetchTodos, addOrUpdateTodo, deleteTodo } from "./todoHandler";

export default function TodoPage() {
  const [todos, setTodos] = useState<
    { id: number; title: string; description: string; created_at: string }[]
  >([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);
  const API_URL = "http://localhost:8000/api/tasks";

  // Fetch todos on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTodos(API_URL);
      setTodos(data);
    };
    fetchData();
  }, [API_URL]);

  // Add or update todo
  const handleAddOrUpdateTodo = async () => {
    if (newTodo.title.trim() && newTodo.description.trim()) {
      const result = await addOrUpdateTodo(API_URL, isEditing, newTodo, currentTodoId);
      if (result) {
        if (isEditing) {
          setTodos(todos.map((todo) => (todo.id === currentTodoId ? result : todo)));
        } else {
          setTodos([...todos, result]);
        }
        setNewTodo({ title: "", description: "" });
        setIsEditing(false);
        setCurrentTodoId(null);
      }
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id: number) => {
    const success = await deleteTodo(API_URL, id);
    if (success) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  // Prepare for editing a todo
  const handleEditTodo = (todo: { id: number; title: string; description: string }) => {
    setNewTodo({ title: todo.title, description: todo.description });
    setIsEditing(true);
    setCurrentTodoId(todo.id);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <UserNavbar />
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 mt-20">
        {/* Add/Edit Todo Form */}
        <div className="flex flex-col w-full md:w-1/2 mb-4">
          <h1 className="text-4xl font-extrabold text-center text-black mb-8">
            {isEditing ? "Edit Task" : "Add New Task"}
          </h1>
          <div className="flex flex-col space-y-4 mb-6">
            <input
              type="text"
              placeholder="Task Title"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition text-black"
            />
            <textarea
              placeholder="Task Description"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-500 transition resize-none text-black"
              rows="4"
            />
            <button
              onClick={handleAddOrUpdateTodo}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition duration-300 ease-in-out"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            To-Do List
          </h2>
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex flex-col justify-between items-start bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between w-full mb-2">
                  <span className="text-xl font-semibold text-black">
                    {todo.title}
                  </span>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300 flex items-center space-x-2"
                  >
                    <FiTrash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
                <p className="text-gray-700 mb-2">{todo.description}</p>
                <span className="text-sm text-gray-500">
                  Created at: {new Date(todo.created_at).toLocaleString()}
                </span>
                <button
                  onClick={() => handleEditTodo(todo)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>

          {/* Empty State */}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-6 animate-bounce">
              No tasks added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
