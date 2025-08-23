import { Vault, Holding, PerformanceData, User, DashboardStats } from '@/utils/types';

// Mock Holdings Data
export const techHoldings: Holding[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', allocation: 25, currentPrice: 185.45, change24h: 2.34, changePercent: 1.28, type: 'stock', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', allocation: 20, currentPrice: 378.90, change24h: -1.45, changePercent: -0.38, type: 'stock', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', allocation: 18, currentPrice: 142.38, change24h: 3.22, changePercent: 2.31, type: 'stock', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', allocation: 15, currentPrice: 148.22, change24h: 1.89, changePercent: 1.29, type: 'stock', sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', allocation: 12, currentPrice: 785.45, change24h: 15.67, changePercent: 2.04, type: 'stock', sector: 'Technology' },
  { symbol: 'BTC', name: 'Bitcoin', allocation: 10, currentPrice: 43250.00, change24h: 890.45, changePercent: 2.10, type: 'crypto' },
];

export const cryptoHoldings: Holding[] = [
  { symbol: 'BTC', name: 'Bitcoin', allocation: 40, currentPrice: 43250.00, change24h: 890.45, changePercent: 2.10, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', allocation: 30, currentPrice: 2580.30, change24h: 45.20, changePercent: 1.78, type: 'crypto' },
  { symbol: 'AAPL', name: 'Apple Inc.', allocation: 15, currentPrice: 185.45, change24h: 2.34, changePercent: 1.28, type: 'stock', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc.', allocation: 10, currentPrice: 245.67, change24h: -3.45, changePercent: -1.38, type: 'stock', sector: 'Automotive' },
  { symbol: 'SOL', name: 'Solana', allocation: 5, currentPrice: 98.45, change24h: 4.23, changePercent: 4.49, type: 'crypto' },
];

export const aviationHoldings: Holding[] = [
  { symbol: 'BA', name: 'Boeing Co.', allocation: 25, currentPrice: 215.45, change24h: 3.45, changePercent: 1.63, type: 'stock', sector: 'Aerospace' },
  { symbol: 'LMT', name: 'Lockheed Martin', allocation: 20, currentPrice: 445.67, change24h: 2.34, changePercent: 0.53, type: 'stock', sector: 'Aerospace' },
  { symbol: 'RTX', name: 'RTX Corporation', allocation: 18, currentPrice: 89.23, change24h: 1.23, changePercent: 1.40, type: 'stock', sector: 'Aerospace' },
  { symbol: 'GE', name: 'General Electric', allocation: 15, currentPrice: 156.78, change24h: -0.89, changePercent: -0.56, type: 'stock', sector: 'Industrial' },
  { symbol: 'JETS', name: 'U.S. Global Jets ETF', allocation: 12, currentPrice: 24.56, change24h: 0.45, changePercent: 1.87, type: 'stock', sector: 'ETF' },
  { symbol: 'AAL', name: 'American Airlines', allocation: 10, currentPrice: 14.23, change24h: 0.23, changePercent: 1.64, type: 'stock', sector: 'Airlines' },
];

export const balancedHoldings: Holding[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', allocation: 15, currentPrice: 185.45, change24h: 2.34, changePercent: 1.28, type: 'stock', sector: 'Technology' },
  { symbol: 'BTC', name: 'Bitcoin', allocation: 15, currentPrice: 43250.00, change24h: 890.45, changePercent: 2.10, type: 'crypto' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', allocation: 12, currentPrice: 378.90, change24h: -1.45, changePercent: -0.38, type: 'stock', sector: 'Technology' },
  { symbol: 'JPM', name: 'JPMorgan Chase', allocation: 10, currentPrice: 178.45, change24h: 1.23, changePercent: 0.69, type: 'stock', sector: 'Financial' },
  { symbol: 'ETH', name: 'Ethereum', allocation: 10, currentPrice: 2580.30, change24h: 45.20, changePercent: 1.78, type: 'crypto' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', allocation: 8, currentPrice: 156.78, change24h: 0.45, changePercent: 0.29, type: 'stock', sector: 'Healthcare' },
  { symbol: 'PG', name: 'Procter & Gamble', allocation: 8, currentPrice: 145.23, change24h: 0.89, changePercent: 0.62, type: 'stock', sector: 'Consumer Goods' },
  { symbol: 'V', name: 'Visa Inc.', allocation: 7, currentPrice: 267.89, change24h: 2.34, changePercent: 0.88, type: 'stock', sector: 'Financial' },
  { symbol: 'KO', name: 'Coca-Cola Co.', allocation: 7, currentPrice: 58.45, change24h: 0.23, changePercent: 0.40, type: 'stock', sector: 'Consumer Goods' },
  { symbol: 'GOLD', name: 'Gold ETF', allocation: 8, currentPrice: 189.45, change24h: -0.45, changePercent: -0.24, type: 'commodity' },
];

// Mock Vaults Data
export const mockVaults: Vault[] = [
  {
    id: 'vault-tech-crypto',
    name: 'Tech + Crypto Vault',
    description: 'MAANG stocks combined with Bitcoin for maximum growth potential. Perfect for investors seeking high-growth exposure to both traditional tech giants and cryptocurrency.',
    category: 'tech',
    monthlyFee: 29.99,
    cagr: 24.5,
    vsNasdaq: 8.2,
    vsEurostoxx: 12.8,
    holdings: techHoldings,
    subscribers: 1247,
    riskLevel: 'high',
    lastUpdated: '2025-01-23',
    totalValue: 2540000,
    minInvestment: 1000,
    icon: '🚀',
    color: 'hsl(var(--vault-tech))',
    tags: ['High Growth', 'Tech Heavy', 'Crypto Exposure']
  },
  {
    id: 'vault-pure-crypto',
    name: 'Pure Crypto Vault',
    description: 'Diversified cryptocurrency portfolio with major coins and promising altcoins. High-risk, high-reward strategy for crypto enthusiasts.',
    category: 'crypto',
    monthlyFee: 39.99,
    cagr: 45.8,
    vsNasdaq: 32.1,
    vsEurostoxx: 38.5,
    holdings: cryptoHoldings,
    subscribers: 892,
    riskLevel: 'high',
    lastUpdated: '2025-01-23',
    totalValue: 1820000,
    minInvestment: 500,
    icon: '₿',
    color: 'hsl(var(--vault-crypto))',
    tags: ['Pure Crypto', 'DeFi', 'High Volatility']
  },
  {
    id: 'vault-aviation',
    name: 'Aviation Focused Vault',
    description: 'Aerospace and aviation industry exposure including Boeing, defense contractors, and airline stocks. Recovery play with long-term growth potential.',
    category: 'aviation',
    monthlyFee: 24.99,
    cagr: 18.3,
    vsNasdaq: 2.1,
    vsEurostoxx: 6.8,
    holdings: aviationHoldings,
    subscribers: 634,
    riskLevel: 'medium',
    lastUpdated: '2025-01-23',
    totalValue: 980000,
    minInvestment: 750,
    icon: '✈️',
    color: 'hsl(var(--vault-aviation))',
    tags: ['Sector Focus', 'Recovery Play', 'Defense']
  },
  {
    id: 'vault-balanced',
    name: 'Balanced Growth Vault',
    description: 'Diversified portfolio mixing growth stocks, crypto, and defensive assets. Balanced risk-return profile suitable for most investors.',
    category: 'balanced',
    monthlyFee: 19.99,
    cagr: 16.7,
    vsNasdaq: 0.4,
    vsEurostoxx: 4.2,
    holdings: balancedHoldings,
    subscribers: 2156,
    riskLevel: 'medium',
    lastUpdated: '2025-01-23',
    totalValue: 3420000,
    minInvestment: 500,
    icon: '⚖️',
    color: 'hsl(var(--vault-balanced))',
    tags: ['Balanced', 'Diversified', 'Moderate Risk']
  }
];

// Mock Performance Data
export const mockPerformanceData: PerformanceData[] = [
  {
    vaultId: 'vault-tech-crypto',
    timeframe: '1Y',
    data: [
      { date: '2024-01', value: 100, return: 0 },
      { date: '2024-02', value: 105.2, return: 5.2 },
      { date: '2024-03', value: 98.7, return: -1.3 },
      { date: '2024-04', value: 112.4, return: 12.4 },
      { date: '2024-05', value: 108.9, return: 8.9 },
      { date: '2024-06', value: 115.6, return: 15.6 },
      { date: '2024-07', value: 122.8, return: 22.8 },
      { date: '2024-08', value: 119.3, return: 19.3 },
      { date: '2024-09', value: 126.7, return: 26.7 },
      { date: '2024-10', value: 118.9, return: 18.9 },
      { date: '2024-11', value: 134.2, return: 34.2 },
      { date: '2024-12', value: 124.5, return: 24.5 }
    ],
    benchmarks: {
      nasdaq: [
        { date: '2024-01', value: 100, return: 0 },
        { date: '2024-02', value: 102.1, return: 2.1 },
        { date: '2024-03', value: 99.8, return: -0.2 },
        { date: '2024-04', value: 105.6, return: 5.6 },
        { date: '2024-05', value: 107.2, return: 7.2 },
        { date: '2024-06', value: 109.8, return: 9.8 },
        { date: '2024-07', value: 112.3, return: 12.3 },
        { date: '2024-08', value: 110.7, return: 10.7 },
        { date: '2024-09', value: 114.5, return: 14.5 },
        { date: '2024-10', value: 112.9, return: 12.9 },
        { date: '2024-11', value: 117.8, return: 17.8 },
        { date: '2024-12', value: 116.3, return: 16.3 }
      ]
    }
  }
];

// Mock User Data
export const mockUser: User = {
  id: 'user-123',
  email: 'investor@example.com',
  name: 'Alex Johnson',
  avatar: 'https://avatar.vercel.sh/alex',
  subscribedVaults: ['vault-tech-crypto', 'vault-balanced'],
  totalInvested: 15750,
  totalReturns: 3240,
  joinedDate: '2024-03-15',
  plan: 'premium'
};

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalVaults: 4,
  totalSubscribers: 4929,
  avgCagr: 26.3,
  bestPerformer: 'vault-pure-crypto'
};

// Utility function to get vault by ID
export const getVaultById = (id: string): Vault | undefined => {
  return mockVaults.find(vault => vault.id === id);
};

// Utility function to get performance data by vault ID
export const getPerformanceByVaultId = (vaultId: string): PerformanceData | undefined => {
  return mockPerformanceData.find(data => data.vaultId === vaultId);
};