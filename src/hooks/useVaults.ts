import { useEffect } from 'react';
import { useVaultStore } from '@/store/vaultStore';
import { Vault, VaultCategory, VaultFilter } from '@/utils/types';

// Main hook for vault data
export const useVaults = () => {
  const {
    vaults,
    loading,
    error,
    filters,
    selectedVault,
    fetchVaults,
    setFilters,
    clearFilters,
    getFilteredVaults,
    getVaultsByCategory,
    setSelectedVault,
  } = useVaultStore();

  // Auto-fetch vaults on mount
  useEffect(() => {
    if (vaults.length === 0) {
      fetchVaults();
    }
  }, []);

  return {
    vaults,
    loading,
    error,
    filters,
    selectedVault,
    filteredVaults: getFilteredVaults(),
    
    // Actions
    refetch: fetchVaults,
    setFilters,
    clearFilters,
    selectVault: setSelectedVault,
    getVaultsByCategory,
  };
};

// Hook for specific vault by ID
export const useVault = (vaultId: string | undefined) => {
  const { vaults, getVaultById, setSelectedVault } = useVaultStore();
  
  useEffect(() => {
    if (vaultId) {
      const vault = getVaultById(vaultId);
      if (vault) {
        setSelectedVault(vault);
      }
    }
  }, [vaultId]);

  return {
    vault: vaultId ? getVaultById(vaultId) : null,
    exists: vaultId ? !!getVaultById(vaultId) : false,
  };
};

// Hook for vault subscription management
export const useVaultSubscription = () => {
  const { subscribeToVault, unsubscribeFromVault, loading, error } = useVaultStore();

  const subscribe = async (vaultId: string) => {
    try {
      await subscribeToVault(vaultId);
      return { success: true, error: null };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Subscription failed' 
      };
    }
  };

  const unsubscribe = async (vaultId: string) => {
    try {
      await unsubscribeFromVault(vaultId);
      return { success: true, error: null };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Unsubscription failed' 
      };
    }
  };

  return {
    subscribe,
    unsubscribe,
    loading,
    error,
  };
};

// Hook for vault filtering
export const useVaultFilters = () => {
  const { filters, setFilters, clearFilters, getFilteredVaults } = useVaultStore();

  const updateFilter = (key: keyof VaultFilter, value: any) => {
    setFilters({ [key]: value });
  };

  const updateFilters = (newFilters: Partial<VaultFilter>) => {
    setFilters(newFilters);
  };

  return {
    filters,
    filteredVaults: getFilteredVaults(),
    updateFilter,
    updateFilters,
    clearFilters,
    hasActiveFilters: Object.keys(filters).length > 0,
  };
};

// Hook for vault categories
export const useVaultCategories = () => {
  const { getVaultsByCategory } = useVaultStore();

  const categories: VaultCategory[] = ['tech', 'crypto', 'aviation', 'balanced'];
  
  const getCategoryData = (category: VaultCategory) => {
    const vaults = getVaultsByCategory(category);
    const totalValue = vaults.reduce((sum, vault) => sum + vault.totalValue, 0);
    const avgCagr = vaults.length > 0 
      ? vaults.reduce((sum, vault) => sum + vault.cagr, 0) / vaults.length 
      : 0;
    
    return {
      category,
      vaults,
      count: vaults.length,
      totalValue,
      avgCagr,
    };
  };

  return {
    categories,
    getCategoryData,
    categoryStats: categories.map(getCategoryData),
  };
};

// Hook for vault search
export const useVaultSearch = (initialQuery = '') => {
  const { filters, setFilters, getFilteredVaults } = useVaultStore();

  const search = (query: string) => {
    setFilters({ search: query || undefined });
  };

  const clearSearch = () => {
    const { search, ...otherFilters } = filters;
    setFilters(otherFilters);
  };

  return {
    query: filters.search || initialQuery,
    search,
    clearSearch,
    results: getFilteredVaults(),
    hasQuery: !!filters.search,
  };
};