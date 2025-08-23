import { create } from 'zustand';
import { Vault, VaultFilter, VaultCategory, RiskLevel } from '@/utils/types';
import { mockVaults } from '@/data/mockData';

interface VaultStore {
  // State
  vaults: Vault[];
  selectedVault: Vault | null;
  filters: VaultFilter;
  loading: boolean;
  error: string | null;
  
  // Actions
  setVaults: (vaults: Vault[]) => void;
  setSelectedVault: (vault: Vault | null) => void;
  setFilters: (filters: Partial<VaultFilter>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed/Filtered data
  getFilteredVaults: () => Vault[];
  getVaultsByCategory: (category: VaultCategory) => Vault[];
  getVaultById: (id: string) => Vault | undefined;
  
  // Async actions (simulated for MVP)
  fetchVaults: () => Promise<void>;
  subscribeToVault: (vaultId: string) => Promise<void>;
  unsubscribeFromVault: (vaultId: string) => Promise<void>;
}

export const useVaultStore = create<VaultStore>((set, get) => ({
  // Initial state
  vaults: mockVaults,
  selectedVault: null,
  filters: {},
  loading: false,
  error: null,

  // Actions
  setVaults: (vaults) => set({ vaults }),
  
  setSelectedVault: (vault) => set({ selectedVault: vault }),
  
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  
  clearFilters: () => set({ filters: {} }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  // Computed data
  getFilteredVaults: () => {
    const { vaults, filters } = get();
    
    return vaults.filter((vault) => {
      // Category filter
      if (filters.category && vault.category !== filters.category) {
        return false;
      }
      
      // Risk level filter
      if (filters.riskLevel && vault.riskLevel !== filters.riskLevel) {
        return false;
      }
      
      // Min CAGR filter
      if (filters.minCagr && vault.cagr < filters.minCagr) {
        return false;
      }
      
      // Max fee filter
      if (filters.maxFee && vault.monthlyFee > filters.maxFee) {
        return false;
      }
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesName = vault.name.toLowerCase().includes(searchLower);
        const matchesDescription = vault.description.toLowerCase().includes(searchLower);
        const matchesTags = vault.tags.some(tag => 
          tag.toLowerCase().includes(searchLower)
        );
        
        if (!matchesName && !matchesDescription && !matchesTags) {
          return false;
        }
      }
      
      return true;
    });
  },

  getVaultsByCategory: (category) => {
    const { vaults } = get();
    return vaults.filter((vault) => vault.category === category);
  },

  getVaultById: (id) => {
    const { vaults } = get();
    return vaults.find((vault) => vault.id === id);
  },

  // Async actions (simulated)
  fetchVaults: async () => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be: const vaults = await api.getVaults();
      set({ vaults: mockVaults, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vaults',
        loading: false 
      });
    }
  },

  subscribeToVault: async (vaultId) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In real app: await api.subscribeToVault(vaultId);
      console.log(`Subscribed to vault: ${vaultId}`);
      
      // Update vault subscriber count
      const { vaults } = get();
      const updatedVaults = vaults.map(vault => 
        vault.id === vaultId 
          ? { ...vault, subscribers: vault.subscribers + 1 }
          : vault
      );
      
      set({ vaults: updatedVaults, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to subscribe',
        loading: false 
      });
    }
  },

  unsubscribeFromVault: async (vaultId) => {
    set({ loading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In real app: await api.unsubscribeFromVault(vaultId);
      console.log(`Unsubscribed from vault: ${vaultId}`);
      
      // Update vault subscriber count
      const { vaults } = get();
      const updatedVaults = vaults.map(vault => 
        vault.id === vaultId 
          ? { ...vault, subscribers: Math.max(0, vault.subscribers - 1) }
          : vault
      );
      
      set({ vaults: updatedVaults, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to unsubscribe',
        loading: false 
      });
    }
  },
}));