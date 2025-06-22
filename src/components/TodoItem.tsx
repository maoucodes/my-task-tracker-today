
import React from 'react';
import { Check, Trash } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className={`group flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
      completed 
        ? 'bg-gray-800 border-green-800 opacity-75' 
        : 'bg-gray-800 border-gray-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10'
    }`}>
      <button
        onClick={() => onToggle(id)}
        className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 ${
          completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-500 hover:border-green-400 hover:bg-green-500/10'
        }`}
      >
        {completed && <Check size={14} />}
      </button>
      
      <span className={`flex-1 transition-all duration-300 ${
        completed 
          ? 'text-gray-500 line-through' 
          : 'text-white'
      }`}>
        {text}
      </span>
      
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-400 transition-all duration-200 rounded-md hover:bg-red-500/10"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
