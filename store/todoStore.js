import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todos';

export const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  filter: 'all', // 'all', 'open', 'complete'
  searchQuery: '',

  // Load todos from storage
  loadTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        set({ todos: JSON.parse(storedTodos) });
      }
    } catch (error) {
      set({ error: 'Failed to load todos' });
      console.error('Error loading todos:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Save todos to storage
  saveTodos: async (todos) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
      set({ error: 'Failed to save todos' });
    }
  },

  // Add new todo
  addTodo: async (todo) => {
    const newTodo = {
      id: Date.now().toString(),
      title: todo.title,
      description: todo.description || '',
      dueDate: todo.dueDate || null,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTodos = [...get().todos, newTodo];
    set({ todos: updatedTodos });
    await get().saveTodos(updatedTodos);
    return newTodo;
  },

  // Update todo
  updateTodo: async (id, updates) => {
    const updatedTodos = get().todos.map(todo =>
      todo.id === id
        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
        : todo
    );
    set({ todos: updatedTodos });
    await get().saveTodos(updatedTodos);
  },

  // Toggle todo status
  toggleTodoStatus: async (id) => {
    const updatedTodos = get().todos.map(todo =>
      todo.id === id
        ? { 
            ...todo, 
            status: todo.status === 'open' ? 'complete' : 'open',
            updatedAt: new Date().toISOString()
          }
        : todo
    );
    set({ todos: updatedTodos });
    await get().saveTodos(updatedTodos);
  },

  // Delete todo
  deleteTodo: async (id) => {
    const updatedTodos = get().todos.filter(todo => todo.id !== id);
    set({ todos: updatedTodos });
    await get().saveTodos(updatedTodos);
  },

  // Set filter
  setFilter: (filter) => set({ filter }),

  // Set search query
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  // Get filtered and searched todos
  getFilteredTodos: () => {
    const { todos, filter, searchQuery } = get();
    
    let filteredTodos = todos;

    // Apply status filter first
    if (filter === 'open') {
      filteredTodos = todos.filter(todo => todo.status === 'open');
    } else if (filter === 'complete') {
      filteredTodos = todos.filter(todo => todo.status === 'complete');
    }

    // Apply search filter
    if (searchQuery && searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      filteredTodos = filteredTodos.filter(todo => {
        const titleMatch = todo.title && todo.title.toLowerCase().includes(query);
        const descriptionMatch = todo.description && todo.description.toLowerCase().includes(query);
        return titleMatch || descriptionMatch;
      });
    }

    // Sort by creation date (newest first)
    return filteredTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  // Clear error
  clearError: () => set({ error: null }),
})); 