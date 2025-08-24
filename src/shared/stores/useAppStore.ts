import { create } from 'zustand';

export type AppState = {
  isSidebarOpen: boolean;
  currentPage: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
};

export type AppActions = {
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setCurrentPage: (page: string) => void;
  setUser: (user: AppState['user']) => void;
  logout: () => void;
};

export type AppStore = AppState & AppActions;

export const useAppStore = create<AppStore>((set) => ({
  // State
  isSidebarOpen: false,
  currentPage: 'dashboard',
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/images/avatar.jpg',
  },

  // Actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  setSidebarOpen: (isOpen: boolean) =>
    set({ isSidebarOpen: isOpen }),
  
  setCurrentPage: (page: string) =>
    set({ currentPage: page }),
  
  setUser: (user: AppState['user']) =>
    set({ user }),
  
  logout: () =>
    set({ user: null }),
}));
