import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = 'user';

export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Load user from storage
  loadUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  },

  // Save user to storage
  saveUser: async (user) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Google OAuth login (simplified for demo)
  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate Google OAuth for demo purposes
      // In production, you would implement actual Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: 'google_' + Date.now(),
        email: 'your.email@gmail.com', // Change this to your email
        name: 'Your Name', // Change this to your name
        avatar: null,
        provider: 'google',
      };

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
      await get().saveUser(mockUser);
    } catch (error) {
      console.error('Google login error:', error);
      set({ 
        error: 'Login failed. Please try again.', 
        isLoading: false 
      });
    }
  },

  // Demo login (for development)
  loginDemo: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoUser = {
        id: 'demo_' + Date.now(),
        email: 'your.email@gmail.com', // Change this to your email
        name: 'Your Name', // Change this to your name
        avatar: null,
        provider: 'demo',
      };

      set({ user: demoUser, isAuthenticated: true, isLoading: false });
      await get().saveUser(demoUser);
    } catch (error) {
      set({ 
        error: 'Login failed. Please try again.', 
        isLoading: false 
      });
    }
  },

  // Logout
  logout: async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      set({ user: null, isAuthenticated: false, error: null });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },

  // Update user profile
  updateUserProfile: async (updates) => {
    set({ isLoading: true, error: null });
    
    try {
      const currentUser = get().user;
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const updatedUser = {
        ...currentUser,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      set({ user: updatedUser, isLoading: false });
      await get().saveUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user profile:', error);
      set({ 
        error: 'Failed to update profile. Please try again.', 
        isLoading: false 
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
})); 