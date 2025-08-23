import { useMemo } from 'react';
import { Holding, AssetType, HoldingsPieData } from '@/utils/types';
import { useVault } from './useVaults';

// Hook for vault holdings data and analysis
export const useHoldings = (vaultId: string | undefined) => {
  const { vault } = useVault(vaultId);

  // Calculate holdings metrics
  const metrics = useMemo(() => {
    if (!vault?.holdings) return null;

    const holdings = vault.holdings;
    const totalHoldings = holdings.length;
    
    // Calculate by asset type
    const byType = holdings.reduce((acc, holding) => {
      const type = holding.type;
      acc[type] = (acc[type] || 0) + holding.allocation;
      return acc;
    }, {} as Record<AssetType, number>);

    // Calculate by sector (for stocks)
    const bySector = holdings
      .filter(h => h.type === 'stock' && h.sector)
      .reduce((acc, holding) => {
        const sector = holding.sector!;
        acc[sector] = (acc[sector] || 0) + holding.allocation;
        return acc;
      }, {} as Record<string, number>);

    // Top performers and losers
    const sortedByPerformance = [...holdings].sort((a, b) => b.changePercent - a.changePercent);
    const topPerformers = sortedByPerformance.slice(0, 3);
    const topLosers = sortedByPerformance.slice(-3).reverse();

    // Calculate weighted performance
    const weightedReturn = holdings.reduce((sum, holding) => {
      return sum + (holding.changePercent * holding.allocation / 100);
    }, 0);

    // Risk metrics (simplified)
    const volatility = Math.sqrt(
      holdings.reduce((sum, holding) => {
        return sum + Math.pow(holding.changePercent * holding.allocation / 100, 2);
      }, 0)
    );

    return {
      totalHoldings,
      byType,
      bySector,
      topPerformers,
      topLosers,
      weightedReturn,
      volatility,
    };
  }, [vault?.holdings]);

  // Prepare data for pie chart
  const pieData = useMemo((): HoldingsPieData[] => {
    if (!vault?.holdings) return [];

    return vault.holdings.map((holding, index) => ({
      name: holding.name,
      value: holding.allocation,
      color: getHoldingColor(holding.type, index),
      symbol: holding.symbol,
    }));
  }, [vault?.holdings]);

  // Prepare data for asset type distribution
  const assetTypeData = useMemo((): HoldingsPieData[] => {
    if (!metrics?.byType) return [];

    return Object.entries(metrics.byType).map(([type, allocation]) => ({
      name: formatAssetType(type as AssetType),
      value: allocation,
      color: getAssetTypeColor(type as AssetType),
      symbol: type.toUpperCase(),
    }));
  }, [metrics?.byType]);

  // Filter holdings by type
  const getHoldingsByType = (type: AssetType) => {
    return vault?.holdings.filter(h => h.type === type) || [];
  };

  // Search holdings
  const searchHoldings = (query: string) => {
    if (!vault?.holdings || !query) return vault?.holdings || [];
    
    const lowerQuery = query.toLowerCase();
    return vault.holdings.filter(holding => 
      holding.name.toLowerCase().includes(lowerQuery) ||
      holding.symbol.toLowerCase().includes(lowerQuery) ||
      holding.sector?.toLowerCase().includes(lowerQuery)
    );
  };

  return {
    holdings: vault?.holdings || [],
    metrics,
    pieData,
    assetTypeData,
    getHoldingsByType,
    searchHoldings,
    hasHoldings: (vault?.holdings?.length || 0) > 0,
  };
};

// Hook for comparing holdings across vaults
export const useHoldingsComparison = (vaultIds: string[]) => {
  const comparisons = useMemo(() => {
    // This would typically fetch data for multiple vaults
    // For now, we'll return a simplified structure
    return vaultIds.map(id => ({
      vaultId: id,
      // In real implementation, would fetch actual vault data
      commonHoldings: [], // Holdings that appear in multiple vaults
      uniqueHoldings: [], // Holdings unique to this vault
    }));
  }, [vaultIds]);

  return {
    comparisons,
    commonSymbols: [], // Symbols that appear across multiple vaults
    loading: false,
  };
};

// Utility functions
const getHoldingColor = (type: AssetType, index: number): string => {
  const colors = {
    stock: ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'],
    crypto: ['#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12'],
    bond: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
    commodity: ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
  };
  
  const typeColors = colors[type] || colors.stock;
  return typeColors[index % typeColors.length];
};

const getAssetTypeColor = (type: AssetType): string => {
  const colors = {
    stock: '#22c55e',
    crypto: '#eab308', 
    bond: '#3b82f6',
    commodity: '#f59e0b',
  };
  
  return colors[type] || '#6b7280';
};

const formatAssetType = (type: AssetType): string => {
  const labels = {
    stock: 'Stocks',
    crypto: 'Cryptocurrency',
    bond: 'Bonds',
    commodity: 'Commodities',
  };
  
  return labels[type] || type;
};