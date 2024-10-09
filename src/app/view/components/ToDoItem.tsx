// src/app/view/components/ToDoItem.tsx
import React from 'react';

interface Todo {
  id: number;        // Assuming there's an id for each todo item
  title: string;     // The title of the todo item
  completed: boolean; // Whether the todo is completed or not
}

interface ToDoItemProps {
  todo: Todo;               // Type for the todo prop
  onToggle: () => void;     // Type for the onToggle prop (a function that returns void)
  onDelete: () => void;     // Type for the onDelete prop (a function that returns void)
}

export default function ToDoItem({ todo, onToggle, onDelete }: ToDoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className={`flex items-center ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="mr-2"
        />
        <span>{todo.title}</span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );
}
