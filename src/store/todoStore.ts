import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string, description?: string, priority?: 'low' | 'medium' | 'high', dueDate?: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  getTodos: () => Todo[];
  getActiveTodos: () => Todo[];
  getCompletedTodos: () => Todo[];
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      addTodo: (title, description, priority = 'medium', dueDate) => {
        const newTodo: Todo = {
          id: Date.now().toString(),
          title,
          description,
          priority,
          dueDate,
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },

      removeTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      getTodos: () => get().todos,

      getActiveTodos: () => get().todos.filter((todo) => !todo.completed),

      getCompletedTodos: () => get().todos.filter((todo) => todo.completed),
    }),
    {
      name: 'todo-storage',
    }
  )
);
