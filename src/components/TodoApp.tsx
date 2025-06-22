
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
        <p className="text-gray-600">Stay organized and get things done</p>
      </div>

      {/* Add Todo Input */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          onClick={addTodo}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {/* Stats */}
      {totalCount > 0 && (
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-600">
            Total: <span className="font-semibold text-gray-800">{totalCount}</span>
          </span>
          <span className="text-gray-600">
            Completed: <span className="font-semibold text-green-600">{completedCount}</span>
          </span>
          <span className="text-gray-600">
            Remaining: <span className="font-semibold text-blue-600">{totalCount - completedCount}</span>
          </span>
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No todos yet</div>
            <div className="text-gray-500">Add a task above to get started!</div>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>

      {/* Completed Tasks Section */}
      {completedCount > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <span className="text-green-600 font-medium">
              🎉 Great job! You've completed {completedCount} task{completedCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
