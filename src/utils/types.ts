// Core Types for xVault MVP

export interface Vault {
  id: string;
  name: string;
  description: string;
  category: VaultCategory;
  monthlyFee: number;
  cagr: number;
  vsNasdaq: number;
  vsEurostoxx: number;
  holdings: Holding[];
  subscribers: number;
  riskLevel: RiskLevel;
  lastUpdated: string;
  totalValue: number;
  minInvestment: number;
  icon: string;
  color: string;
  tags: string[];
}

export interface Holding {
  symbol: string;
  name: string;
  allocation: number;
  currentPrice: number;
  change24h: number;
  changePercent: number;
  type: AssetType;
  marketCap?: number;
  sector?: string;
}

export interface PerformanceData {
  vaultId: string;
  timeframe: Timeframe;
  data: PerformancePoint[];
  benchmarks: {
    nasdaq: PerformancePoint[];
    eurostoxx?: PerformancePoint[];
  };
}

export interface PerformancePoint {
  date: string;
  value: number;
  return: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscribedVaults: string[];
  totalInvested: number;
  totalReturns: number;
  joinedDate: string;
  plan: SubscriptionPlan;
}

export interface Subscription {
  id: string;
  userId: string;
  vaultId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  paymentMethod: string;
}

// Enums
export type VaultCategory = 'tech' | 'crypto' | 'aviation' | 'balanced';
export type RiskLevel = 'low' | 'medium' | 'high';
export type AssetType = 'stock' | 'crypto' | 'bond' | 'commodity';
export type Timeframe = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
export type SubscriptionPlan = 'free' | 'basic' | 'premium' | 'enterprise';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'pending';

// UI State Types
export interface VaultFilter {
  category?: VaultCategory;
  riskLevel?: RiskLevel;
  minCagr?: number;
  maxFee?: number;
  search?: string;
}

export interface DashboardStats {
  totalVaults: number;
  totalSubscribers: number;
  avgCagr: number;
  bestPerformer: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Chart Data Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
}

export interface HoldingsPieData {
  name: string;
  value: number;
  color: string;
  symbol: string;
}