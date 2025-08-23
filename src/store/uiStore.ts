import { create } from 'zustand';

interface UIStore {
  // Modal states
  isSubscriptionModalOpen: boolean;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isProfileModalOpen: boolean;
  
  // Sidebar state
  sidebarCollapsed: boolean;
  
  // Theme state
  theme: 'dark' | 'light';
  
  // Loading states
  pageLoading: boolean;
  
  // Toast/notification state
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    visible: boolean;
  } | null;
  
  // Modal actions
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  closeAllModals: () => void;
  
  // Sidebar actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Theme actions
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  
  // Loading actions
  setPageLoading: (loading: boolean) => void;
  
  // Notification actions
  showNotification: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideNotification: () => void;
  
  // Utility actions
  resetUIState: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  // Initial state
  isSubscriptionModalOpen: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isProfileModalOpen: false,
  sidebarCollapsed: false,
  theme: 'dark', // Default to dark theme
  pageLoading: false,
  notification: null,

  // Modal actions
  openSubscriptionModal: () => set({ isSubscriptionModalOpen: true }),
  closeSubscriptionModal: () => set({ isSubscriptionModalOpen: false }),
  
  openLoginModal: () => set({ 
    isLoginModalOpen: true,
    isRegisterModalOpen: false // Close register if open
  }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  
  openRegisterModal: () => set({ 
    isRegisterModalOpen: true,
    isLoginModalOpen: false // Close login if open
  }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),
  
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
  
  closeAllModals: () => set({
    isSubscriptionModalOpen: false,
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isProfileModalOpen: false,
  }),

  // Sidebar actions
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Theme actions
  setTheme: (theme) => {
    set({ theme });
    // Apply theme to document class
    document.documentElement.className = theme;
  },
  
  toggleTheme: () => {
    const { theme } = get();
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    get().setTheme(newTheme);
  },

  // Loading actions
  setPageLoading: (pageLoading) => set({ pageLoading }),

  // Notification actions
  showNotification: (message, type = 'info') => {
    set({ 
      notification: { 
        message, 
        type, 
        visible: true 
      } 
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      get().hideNotification();
    }, 5000);
  },
  
  hideNotification: () => set({ notification: null }),

  // Utility actions
  resetUIState: () => set({
    isSubscriptionModalOpen: false,
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isProfileModalOpen: false,
    sidebarCollapsed: false,
    pageLoading: false,
    notification: null,
  }),
}));