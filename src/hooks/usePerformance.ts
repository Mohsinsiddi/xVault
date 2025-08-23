import { useState, useEffect, useMemo } from 'react';
import { PerformanceData, Timeframe, PerformancePoint } from '@/utils/types';
import { mockPerformanceData, getPerformanceByVaultId } from '@/data/mockData';

// Hook for vault performance data
export const usePerformance = (vaultId: string | undefined) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performanceData = useMemo(() => {
    if (!vaultId) return null;
    return getPerformanceByVaultId(vaultId);
  }, [vaultId]);

  // Calculate performance metrics
  const metrics = useMemo(() => {
    if (!performanceData) return null;

    const data = performanceData.data;
    const benchmarkData = performanceData.benchmarks.nasdaq;

    if (data.length === 0) return null;

    const latest = data[data.length - 1];
    const earliest = data[0];
    
    // Calculate returns
    const totalReturn = latest.return;
    const periodDays = data.length * 30; // Assuming monthly data
    const annualizedReturn = Math.pow(1 + totalReturn / 100, 365 / periodDays) - 1;
    
    // Calculate volatility (simplified)
    const returns = data.slice(1).map((point, i) => 
      (point.value - data[i].value) / data[i].value
    );
    const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
    const volatility = Math.sqrt(variance) * Math.sqrt(12); // Annualized
    
    // Sharpe ratio (simplified, assuming 2% risk-free rate)
    const riskFreeRate = 0.02;
    const sharpeRatio = (annualizedReturn - riskFreeRate) / volatility;
    
    // Max drawdown
    let maxDrawdown = 0;
    let peak = data[0].value;
    
    for (const point of data) {
      if (point.value > peak) {
        peak = point.value;
      } else {
        const drawdown = (peak - point.value) / peak;
        maxDrawdown = Math.max(maxDrawdown, drawdown);
      }
    }

    // Benchmark comparison
    const benchmarkLatest = benchmarkData[benchmarkData.length - 1];
    const alpha = totalReturn - benchmarkLatest.return;

    return {
      totalReturn,
      annualizedReturn: annualizedReturn * 100,
      volatility: volatility * 100,
      sharpeRatio,
      maxDrawdown: maxDrawdown * 100,
      alpha,
      beta: 1.2, // Simplified - in real app would calculate properly
    };
  }, [performanceData]);

  // Filtered data based on timeframe
  const filteredData = useMemo(() => {
    if (!performanceData) return null;

    const now = new Date();
    let filterDate: Date;

    switch (timeframe) {
      case '1D':
        filterDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '1W':
        filterDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '1M':
        filterDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '3M':
        filterDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '6M':
        filterDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      case '1Y':
        filterDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case 'ALL':
      default:
        return performanceData;
    }

    const filterDateString = filterDate.toISOString().slice(0, 7); // YYYY-MM format

    return {
      ...performanceData,
      data: performanceData.data.filter(point => point.date >= filterDateString),
      benchmarks: {
        ...performanceData.benchmarks,
        nasdaq: performanceData.benchmarks.nasdaq.filter(point => point.date >= filterDateString),
      }
    };
  }, [performanceData, timeframe]);

  // Simulate loading state
  useEffect(() => {
    if (vaultId) {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        setLoading(false);
        if (!performanceData) {
          setError('Performance data not found');
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [vaultId, performanceData]);

  return {
    data: filteredData,
    metrics,
    timeframe,
    setTimeframe,
    loading,
    error,
    hasData: !!filteredData,
  };
};

// Hook for comparing multiple vaults
export const usePerformanceComparison = (vaultIds: string[]) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [loading, setLoading] = useState(false);

  const comparisonData = useMemo(() => {
    return vaultIds.map(vaultId => {
      const data = getPerformanceByVaultId(vaultId);
      return {
        vaultId,
        data,
        name: `Vault ${vaultId.split('-').pop()}`, // Simple name extraction
      };
    }).filter(item => item.data !== undefined);
  }, [vaultIds]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [vaultIds, timeframe]);

  return {
    comparisonData,
    timeframe,
    setTimeframe,
    loading,
    hasData: comparisonData.length > 0,
  };
};

// Hook for performance summary stats
export const usePerformanceSummary = () => {
  const allPerformance = mockPerformanceData;

  const summary = useMemo(() => {
    if (allPerformance.length === 0) return null;

    // Calculate aggregate metrics across all vaults
    const avgReturns = allPerformance.map(vault => {
      const latest = vault.data[vault.data.length - 1];
      return latest.return;
    });

    const totalAvgReturn = avgReturns.reduce((a, b) => a + b, 0) / avgReturns.length;
    const bestPerformer = Math.max(...avgReturns);
    const worstPerformer = Math.min(...avgReturns);

    return {
      totalVaults: allPerformance.length,
      avgReturn: totalAvgReturn,
      bestPerformer,
      worstPerformer,
      totalDataPoints: allPerformance.reduce((sum, vault) => sum + vault.data.length, 0),
    };
  }, [allPerformance]);

  return {
    summary,
    loading: false,
    error: null,
  };
};