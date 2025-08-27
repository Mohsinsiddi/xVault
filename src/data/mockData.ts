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

// Add these to your existing mockData.ts file

// Performance Chart Data for VaultDetails
export const mockPerformanceChartData = {
  'vault-tech-crypto': [
    { month: 'Jan 24', vault: 100, nasdaq: 100, sp500: 100 },
    { month: 'Feb 24', vault: 105.2, nasdaq: 102.1, sp500: 101.8 },
    { month: 'Mar 24', vault: 98.7, nasdaq: 99.8, sp500: 100.2 },
    { month: 'Apr 24', vault: 112.4, nasdaq: 105.6, sp500: 104.9 },
    { month: 'May 24', vault: 108.9, nasdaq: 107.2, sp500: 106.1 },
    { month: 'Jun 24', vault: 115.6, nasdaq: 109.8, sp500: 108.3 },
    { month: 'Jul 24', vault: 122.8, nasdaq: 112.3, sp500: 110.7 },
    { month: 'Aug 24', vault: 119.3, nasdaq: 110.7, sp500: 109.4 },
    { month: 'Sep 24', vault: 126.7, nasdaq: 114.5, sp500: 112.8 },
    { month: 'Oct 24', vault: 118.9, nasdaq: 112.9, sp500: 111.6 },
    { month: 'Nov 24', vault: 134.2, nasdaq: 117.8, sp500: 115.2 },
    { month: 'Dec 24', vault: 124.5, nasdaq: 116.3, sp500: 114.8 }
  ],
  'vault-pure-crypto': [
    { month: 'Jan 24', vault: 100, nasdaq: 100, sp500: 100 },
    { month: 'Feb 24', vault: 118.5, nasdaq: 102.1, sp500: 101.8 },
    { month: 'Mar 24', vault: 87.3, nasdaq: 99.8, sp500: 100.2 },
    { month: 'Apr 24', vault: 142.7, nasdaq: 105.6, sp500: 104.9 },
    { month: 'May 24', vault: 125.4, nasdaq: 107.2, sp500: 106.1 },
    { month: 'Jun 24', vault: 156.8, nasdaq: 109.8, sp500: 108.3 },
    { month: 'Jul 24', vault: 173.2, nasdaq: 112.3, sp500: 110.7 },
    { month: 'Aug 24', vault: 151.9, nasdaq: 110.7, sp500: 109.4 },
    { month: 'Sep 24', vault: 189.4, nasdaq: 114.5, sp500: 112.8 },
    { month: 'Oct 24', vault: 162.1, nasdaq: 112.9, sp500: 111.6 },
    { month: 'Nov 24', vault: 201.7, nasdaq: 117.8, sp500: 115.2 },
    { month: 'Dec 24', vault: 145.8, nasdaq: 116.3, sp500: 114.8 }
  ],
  'vault-aviation': [
    { month: 'Jan 24', vault: 100, nasdaq: 100, sp500: 100 },
    { month: 'Feb 24', vault: 103.4, nasdaq: 102.1, sp500: 101.8 },
    { month: 'Mar 24', vault: 106.2, nasdaq: 99.8, sp500: 100.2 },
    { month: 'Apr 24', vault: 109.8, nasdaq: 105.6, sp500: 104.9 },
    { month: 'May 24', vault: 107.1, nasdaq: 107.2, sp500: 106.1 },
    { month: 'Jun 24', vault: 111.5, nasdaq: 109.8, sp500: 108.3 },
    { month: 'Jul 24', vault: 114.7, nasdaq: 112.3, sp500: 110.7 },
    { month: 'Aug 24', vault: 112.3, nasdaq: 110.7, sp500: 109.4 },
    { month: 'Sep 24', vault: 116.9, nasdaq: 114.5, sp500: 112.8 },
    { month: 'Oct 24', vault: 113.2, nasdaq: 112.9, sp500: 111.6 },
    { month: 'Nov 24', vault: 119.4, nasdaq: 117.8, sp500: 115.2 },
    { month: 'Dec 24', vault: 118.3, nasdaq: 116.3, sp500: 114.8 }
  ],
  'vault-balanced': [
    { month: 'Jan 24', vault: 100, nasdaq: 100, sp500: 100 },
    { month: 'Feb 24', vault: 102.8, nasdaq: 102.1, sp500: 101.8 },
    { month: 'Mar 24', vault: 101.4, nasdaq: 99.8, sp500: 100.2 },
    { month: 'Apr 24', vault: 106.3, nasdaq: 105.6, sp500: 104.9 },
    { month: 'May 24', vault: 108.1, nasdaq: 107.2, sp500: 106.1 },
    { month: 'Jun 24', vault: 110.7, nasdaq: 109.8, sp500: 108.3 },
    { month: 'Jul 24', vault: 113.2, nasdaq: 112.3, sp500: 110.7 },
    { month: 'Aug 24', vault: 111.8, nasdaq: 110.7, sp500: 109.4 },
    { month: 'Sep 24', vault: 114.9, nasdaq: 114.5, sp500: 112.8 },
    { month: 'Oct 24', vault: 113.1, nasdaq: 112.9, sp500: 111.6 },
    { month: 'Nov 24', vault: 117.3, nasdaq: 117.8, sp500: 115.2 },
    { month: 'Dec 24', vault: 116.7, nasdaq: 116.3, sp500: 114.8 }
  ]
};

// Risk Metrics for each vault
export const mockRiskMetrics = {
  'vault-tech-crypto': {
    sharpeRatio: 1.45,
    maxDrawdown: -18.7,
    volatility: 22.3,
    beta: 1.32,
    alpha: 8.2,
    sortino: 1.89
  },
  'vault-pure-crypto': {
    sharpeRatio: 1.12,
    maxDrawdown: -35.4,
    volatility: 45.6,
    beta: 0.85,
    alpha: 32.1,
    sortino: 1.34
  },
  'vault-aviation': {
    sharpeRatio: 1.23,
    maxDrawdown: -12.4,
    volatility: 16.8,
    beta: 1.12,
    alpha: 2.1,
    sortino: 1.67
  },
  'vault-balanced': {
    sharpeRatio: 1.34,
    maxDrawdown: -9.8,
    volatility: 14.2,
    beta: 0.89,
    alpha: 0.4,
    sortino: 1.78
  }
};

// Monthly returns data for detailed analysis
export const mockMonthlyReturns = {
  'vault-tech-crypto': [
    { month: 'Jan 24', return: 5.2 },
    { month: 'Feb 24', return: -6.2 },
    { month: 'Mar 24', return: 13.9 },
    { month: 'Apr 24', return: -3.1 },
    { month: 'May 24', return: 6.1 },
    { month: 'Jun 24', return: 6.2 },
    { month: 'Jul 24', return: -2.9 },
    { month: 'Aug 24', return: 6.2 },
    { month: 'Sep 24', return: -6.1 },
    { month: 'Oct 24', return: 12.9 },
    { month: 'Nov 24', return: -7.2 },
    { month: 'Dec 24', return: 0.0 }
  ]
};

// Detailed vault descriptions for VaultDetails page
export const vaultDetailedDescriptions = {
  'vault-tech-crypto': `This premium vault combines the stability of established technology giants with the growth potential of cryptocurrency. Our strategy focuses on FAANG stocks complemented by Bitcoin exposure for maximum diversification benefits.

The vault maintains a 90% equity allocation with leading technology companies, while the remaining 10% is allocated to Bitcoin as a hedge against inflation and currency debasuation. This approach has consistently outperformed traditional tech-only portfolios.

Rebalancing occurs monthly to maintain optimal allocations, with dynamic adjustments based on market volatility and momentum indicators.`,

  'vault-pure-crypto': `A concentrated cryptocurrency portfolio designed for investors seeking maximum exposure to digital assets. This vault employs a strategic mix of established cryptocurrencies and promising altcoins.

Our research-driven approach focuses on fundamental analysis of blockchain projects, tokenomics, and adoption metrics. The portfolio is rebalanced weekly to capture momentum while managing downside risk through systematic stop-losses.

This vault is suitable for experienced investors with high risk tolerance and strong conviction in the long-term potential of cryptocurrency markets.`,

  'vault-aviation': `Focused on the aerospace and aviation sector recovery, this vault provides exposure to commercial airlines, aircraft manufacturers, and defense contractors. Our thesis centers on the post-pandemic recovery and long-term growth in air travel demand.

The portfolio includes established players like Boeing and Lockheed Martin, complemented by airline stocks positioned for recovery. We also maintain exposure to emerging technologies in electric aircraft and urban air mobility.

Regular sector rotation based on economic indicators and travel demand data ensures optimal positioning throughout different market cycles.`,

  'vault-balanced': `A diversified portfolio designed for long-term wealth preservation and steady growth. This vault combines growth stocks, dividend aristocrats, cryptocurrency, and alternative investments for optimal risk-adjusted returns.

Our asset allocation model dynamically adjusts based on market conditions, maintaining exposure across technology, healthcare, financials, and consumer staples. The cryptocurrency allocation provides inflation protection and portfolio diversification benefits.

This vault is ideal for investors seeking steady returns with moderate risk, suitable for retirement planning and wealth preservation strategies.`
};

// Vault manager information
export const vaultManagers = {
  'vault-tech-crypto': {
    name: 'Sarah Chen',
    title: 'Senior Portfolio Manager',
    experience: '12 years',
    background: 'Former Goldman Sachs tech analyst with expertise in growth investing',
    avatar: 'https://avatar.vercel.sh/sarah-chen'
  },
  'vault-pure-crypto': {
    name: 'Marcus Rodriguez', 
    title: 'Cryptocurrency Strategist',
    experience: '8 years',
    background: 'Early Bitcoin adopter, former Coinbase institutional sales director',
    avatar: 'https://avatar.vercel.sh/marcus-rodriguez'
  },
  'vault-aviation': {
    name: 'David Thompson',
    title: 'Sector Specialist',
    experience: '15 years',
    background: 'Aerospace industry veteran, former Boeing financial analyst',
    avatar: 'https://avatar.vercel.sh/david-thompson'
  },
  'vault-balanced': {
    name: 'Lisa Park',
    title: 'Chief Investment Officer',
    experience: '18 years',
    background: 'Former Vanguard portfolio manager specializing in asset allocation',
    avatar: 'https://avatar.vercel.sh/lisa-park'
  }
};

// Key insights and recent updates for each vault
export const vaultInsights = {
  'vault-tech-crypto': [
    {
      date: '2024-12-15',
      title: 'Q4 Tech Earnings Preview',
      content: 'Strong AI growth expected to drive NVIDIA and Microsoft earnings. Bitcoin allocation increased to 12% on institutional adoption trends.'
    },
    {
      date: '2024-11-28',
      title: 'Portfolio Rebalancing',
      content: 'Reduced Apple allocation by 3% to capture Google AI momentum. Maintained defensive cash position at 5%.'
    }
  ],
  'vault-pure-crypto': [
    {
      date: '2024-12-18',
      title: 'Bitcoin ETF Impact',
      content: 'Spot Bitcoin ETF approvals driving institutional inflows. Increased BTC allocation to 45% on momentum.'
    },
    {
      date: '2024-12-01',
      title: 'Altcoin Rotation',
      content: 'Added Solana position on ecosystem growth. Reduced Ethereum exposure ahead of potential selling pressure.'
    }
  ],
  'vault-aviation': [
    {
      date: '2024-12-10',
      title: 'Travel Demand Recovery',
      content: 'International travel returning to pre-pandemic levels. Increased airline exposure by 5%.'
    },
    {
      date: '2024-11-22',
      title: 'Defense Spending',
      content: 'Geopolitical tensions supporting defense contractor valuations. Maintaining overweight LMT and RTX positions.'
    }
  ],
  'vault-balanced': [
    {
      date: '2024-12-12',
      title: 'Defensive Positioning',
      content: 'Added healthcare and consumer staples exposure ahead of potential economic slowdown. Maintaining 15% crypto allocation.'
    },
    {
      date: '2024-11-30',
      title: 'Dividend Strategy',
      content: 'Focused on dividend aristocrats for income generation. Current yield at 2.8% with growth potential.'
    }
  ]
};

// Type-safe utility functions with proper key checking

// Utility function to get performance chart data by vault ID
export const getPerformanceChartData = (vaultId: string) => {
  return mockPerformanceChartData[vaultId as keyof typeof mockPerformanceChartData] || mockPerformanceChartData['vault-tech-crypto'];
};

// Utility function to get risk metrics by vault ID
export const getRiskMetrics = (vaultId: string) => {
  return mockRiskMetrics[vaultId as keyof typeof mockRiskMetrics] || mockRiskMetrics['vault-tech-crypto'];
};

// Utility function to get detailed description by vault ID
export const getDetailedDescription = (vaultId: string) => {
  return vaultDetailedDescriptions[vaultId as keyof typeof vaultDetailedDescriptions] || vaultDetailedDescriptions['vault-tech-crypto'];
};

// Utility function to get vault manager by vault ID
export const getVaultManager = (vaultId: string) => {
  return vaultManagers[vaultId as keyof typeof vaultManagers] || vaultManagers['vault-tech-crypto'];
};

// Utility function to get vault insights by vault ID
export const getVaultInsights = (vaultId: string) => {
  return vaultInsights[vaultId as keyof typeof vaultInsights] || vaultInsights['vault-tech-crypto'];
};

// Utility function to get vault by ID
export const getVaultById = (id: string): Vault | undefined => {
  return mockVaults.find(vault => vault.id === id);
};

// Utility function to get performance data by vault ID
export const getPerformanceByVaultId = (vaultId: string): PerformanceData | undefined => {
  return mockPerformanceData.find(data => data.vaultId === vaultId);
};