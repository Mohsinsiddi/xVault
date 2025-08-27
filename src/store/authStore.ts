import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SubscriptionPlan } from '@/utils/types';
import { mockUser } from '@/data/mockData';

interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Auth methods
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  
  // Subscription methods
  upgradePlan: (plan: SubscriptionPlan) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  
  // Getters
  hasActiveSubscription: () => boolean;
  canAccessVault: (vaultId: string) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Basic setters
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),

      // Auth methods
      login: async (email, password) => {
        set({ loading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1200));
          
          // Basic validation for demo
          if (email === 'demo@xvault.com' && password === 'password') {
            set({ 
              user: mockUser, 
              isAuthenticated: true, 
              loading: false 
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            loading: false 
          });
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      register: async (email, password, name) => {
        set({ loading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Create new user (in real app, this would be handled by backend)
          const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            avatar: `https://avatar.vercel.sh/${name.toLowerCase().replace(' ', '')}`,
            subscribedVaults: [],
            totalInvested: 0,
            totalReturns: 0,
            joinedDate: new Date().toISOString().split('T')[0],
            plan: 'free'
          };
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            loading: false 
          });
        }
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return;
        
        set({ loading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const updatedUser = { ...user, ...updates };
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Update failed',
            loading: false 
          });
        }
      },

      // Subscription methods
      upgradePlan: async (plan) => {
        const { user } = get();
        if (!user) return;
        
        set({ loading: true, error: null });
        
        try {
          // Simulate payment processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const updatedUser = { ...user, plan };
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Upgrade failed',
            loading: false 
          });
        }
      },

      cancelSubscription: async () => {
        const { user } = get();
        if (!user) return;
        
        set({ loading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const updatedUser = { ...user, plan: 'free' as SubscriptionPlan };
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Cancellation failed',
            loading: false 
          });
        }
      },

      // Getters
      hasActiveSubscription: () => {
        const { user } = get();
        return user ? user.plan !== 'free' : false;
      },

      canAccessVault: (vaultId) => {
        const { user } = get();
        if (!user) return false;
        
        // Free users can only access balanced vault
        if (user.plan === 'free') {
          return vaultId === 'vault-balanced';
        }
        
        // Basic users can access balanced + one premium vault
        if (user.plan === 'basic') {
          return ['vault-balanced', 'vault-tech-crypto'].includes(vaultId);
        }
        
        // Premium and enterprise users can access all vaults
        return true;
      },
    }),
    {
      name: 'xvault-auth', // unique name for localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);