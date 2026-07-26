'use client';

import React, { useState } from 'react';
import { useTodoStore } from '@/store/todoStore';
import { Button } from '@/components/Accessible/Button';
import { Card, CardContent, CardHeader } from '@/components/Accessible/Card';
import { Alert } from '@/components/Accessible/Alert';

export default function TodoApp() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
    getActiveTodos,
    getCompletedTodos,
  } = useTodoStore();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, description, priority, dueDate);
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
    }
  };

  const filteredTodos =
    filter === 'active'
      ? getActiveTodos()
      : filter === 'completed'
        ? getCompletedTodos()
        : todos;

  const activeTodosCount = getActiveTodos().length;
  const completedTodosCount = getCompletedTodos().length;

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Stay organized and productive with your personal task manager
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedTodosCount}</div>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-orange-600">{activeTodosCount}</div>
              <p className="text-sm text-gray-600">Remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Todo Form */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Add New Task</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTodo} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-4 focus:outline-blue-500"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add task details (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-4 focus:outline-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-4 focus:outline-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-4 focus:outline-blue-500"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Tasks
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active ({activeTodosCount})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTodosCount})
          </Button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <Alert type="info" title="No Tasks">
              {filter === 'all'
                ? 'Create your first task to get started!'
                : filter === 'active'
                  ? 'All tasks are completed! Great job!'
                  : 'No completed tasks yet.'}
            </Alert>
          ) : (
            filteredTodos.map((todo) => (
              <Card
                key={todo.id}
                className={`${
                  todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
                } hover:shadow-md transition-shadow`}
              >
                <CardContent className="flex items-start gap-4 py-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className={`text-lg font-semibold ${
                          todo.completed
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {todo.title}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[todo.priority]} bg-gray-100`}
                      >
                        {todo.priority}
                      </span>
                    </div>

                    {todo.description && (
                      <p className="text-gray-600 text-sm mt-2">{todo.description}</p>
                    )}

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      {todo.dueDate && (
                        <span>📅 {new Date(todo.dueDate).toLocaleDateString()}</span>
                      )}
                      <span>
                        Created {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeTodo(todo.id)}
                    aria-label={`Delete task "${todo.title}"`}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Clear Completed Button */}
        {completedTodosCount > 0 && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="secondary"
              onClick={clearCompleted}
              aria-label={`Clear ${completedTodosCount} completed tasks`}
            >
              Clear {completedTodosCount} Completed Task{completedTodosCount !== 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
