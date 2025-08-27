import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useVaults } from '@/hooks/useVaults';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Zap,
  Bitcoin,
  Plane,
  Scale,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';

export const Performance: React.FC = () => {
  const { user } = useAuth();
  const { vaults } = useVaults();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

  const timeframes = [
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' },
  ];

  const vaultIcons = {
    tech: Zap,
    crypto: Bitcoin,
    aviation: Plane,
    balanced: Scale,
  };

  const vaultColors = {
    tech: 'text-vault-tech-DEFAULT',
    crypto: 'text-vault-crypto-DEFAULT',
    aviation: 'text-vault-aviation-DEFAULT',
    balanced: 'text-vault-balanced-DEFAULT',
  };

  // Mock performance data - replace with actual data from hooks
  const portfolioStats = {
    totalValue: 25750,
    totalReturns: 3240,
    returnPercentage: 14.4,
    bestPerformer: 'Tech + Crypto Vault',
    worstPerformer: 'Aviation Vault',
  };

  const subscribedVaults = vaults.filter(vault => 
    user?.subscribedVaults.includes(vault.id)
  );

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent mb-2">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
          Track your investment performance across all vaults
        </p>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center sm:text-left">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center sm:justify-start">
              <TrendingUp className="h-3 w-3 mr-1 text-vault-crypto-DEFAULT" />
              +12.5% this month
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-vault-crypto-DEFAULT text-center sm:text-left">
              +${portfolioStats.totalReturns.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center sm:text-left">
              {portfolioStats.returnPercentage.toFixed(1)}% total return
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm sm:text-base lg:text-lg font-bold text-foreground text-center sm:text-left">
              {portfolioStats.bestPerformer}
            </div>
            <p className="text-xs text-vault-crypto-DEFAULT font-medium mt-1 flex items-center justify-center sm:justify-start">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +24.5% return
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center sm:text-left">7.2</div>
            <p className="text-xs text-muted-foreground mt-1 text-center sm:text-left">
              Moderate risk profile
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Section */}
      <Card className="premium-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="text-center sm:text-left">
              <CardTitle className="text-lg sm:text-xl text-foreground">Portfolio Performance</CardTitle>
              <CardDescription className="text-sm">
                Track your investment growth over time
              </CardDescription>
            </div>
            <div className="flex justify-center sm:justify-end">
              <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-card/50 p-1 rounded-lg border border-border">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe.value}
                    variant={selectedTimeframe === timeframe.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe.value)}
                    className={cn(
                      "h-7 px-2 sm:h-8 sm:px-3 text-xs sm:text-sm",
                      selectedTimeframe === timeframe.value 
                        ? "bg-primary text-primary-foreground" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {timeframe.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Chart Placeholder */}
          <div className="h-60 sm:h-80 bg-muted/20 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
            <div className="text-center px-4">
              <BarChart3 className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Performance Chart</h3>
              <p className="text-muted-foreground text-sm">
                Interactive chart showing {selectedTimeframe} performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vaults" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border h-auto">
          <TabsTrigger 
            value="vaults" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2"
          >
            Vault Performance
          </TabsTrigger>
          <TabsTrigger 
            value="allocation" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2"
          >
            Asset Allocation
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2"
          >
            Advanced Analytics
          </TabsTrigger>
        </TabsList>

        {/* Vault Performance Tab */}
        <TabsContent value="vaults" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {subscribedVaults.map((vault) => {
              const Icon = vaultIcons[vault.category];
              const colorClass = vaultColors[vault.category];
              const isPositive = vault.cagr > 0;
              
              return (
                <Card key={vault.id} className="premium-card hover:border-primary/40 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "p-2 rounded-xl",
                          `bg-${vault.category === 'tech' ? 'vault-tech-DEFAULT' : vault.category === 'crypto' ? 'vault-crypto-DEFAULT' : vault.category === 'aviation' ? 'vault-aviation-DEFAULT' : 'vault-balanced-DEFAULT'}/10`,
                          `border border-${vault.category === 'tech' ? 'vault-tech-DEFAULT' : vault.category === 'crypto' ? 'vault-crypto-DEFAULT' : vault.category === 'aviation' ? 'vault-aviation-DEFAULT' : 'vault-balanced-DEFAULT'}/20`
                        )}>
                          <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", colorClass)} />
                        </div>
                        <div>
                          <CardTitle className="text-base sm:text-lg text-foreground">{vault.name}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {vault.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className={cn("text-xl sm:text-2xl font-bold", colorClass)}>
                          {vault.cagr.toFixed(1)}%
                        </div>
                        <p className="text-xs text-muted-foreground">CAGR</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">vs NASDAQ</span>
                        <div className="flex items-center space-x-1">
                          {vault.vsNasdaq >= 0 ? (
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-vault-crypto-DEFAULT" />
                          ) : (
                            <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
                          )}
                          <span className={cn(
                            "text-sm font-semibold",
                            vault.vsNasdaq >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                          )}>
                            {vault.vsNasdaq >= 0 ? '+' : ''}{vault.vsNasdaq.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Monthly Fee</span>
                        <span className="text-sm font-semibold text-foreground">${vault.monthlyFee}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">Your Investment</span>
                        <span className="text-sm font-semibold text-foreground">$5,000</span>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm text-muted-foreground">Current Value</span>
                          <div className="text-right">
                            <div className="text-sm sm:text-base font-bold text-foreground">$5,720</div>
                            <div className={cn(
                              "text-xs flex items-center justify-end",
                              isPositive ? "text-vault-crypto-DEFAULT" : "text-destructive"
                            )}>
                              {isPositive ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              +$720 (14.4%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {subscribedVaults.length === 0 && (
              <Card className="premium-card lg:col-span-2">
                <CardContent className="py-12 sm:py-16 text-center">
                  <PieChart className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No Active Subscriptions</h3>
                  <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                    Subscribe to vaults to start tracking your performance
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-premium-purple text-sm" size="sm">
                    Browse Vaults
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Asset Allocation Tab */}
        <TabsContent value="allocation" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <Card className="premium-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl text-foreground text-center sm:text-left">Asset Allocation</CardTitle>
              <CardDescription className="text-center sm:text-left text-sm">
                Breakdown of your investments across different asset classes
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-60 sm:h-80 bg-muted/20 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
                <div className="text-center px-4">
                  <PieChart className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Asset Allocation Chart</h3>
                  <p className="text-muted-foreground text-sm">
                    Interactive pie chart showing your portfolio distribution
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <Card className="premium-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl text-foreground text-center sm:text-left">Advanced Analytics</CardTitle>
              <CardDescription className="text-center sm:text-left text-sm">
                Deep dive into your portfolio metrics and risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-60 sm:h-80 bg-muted/20 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
                <div className="text-center px-4">
                  <Activity className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Advanced Metrics</h3>
                  <p className="text-muted-foreground text-sm">
                    Sharpe ratio, volatility, beta, and other advanced metrics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};