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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent mb-3">
          Performance Analytics
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your investment performance across all vaults
        </p>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-foreground">
              ${portfolioStats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-vault-crypto-DEFAULT" />
              +12.5% this month
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-vault-crypto-DEFAULT">
              +${portfolioStats.totalReturns.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {portfolioStats.returnPercentage.toFixed(1)}% total return
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan">
              <Award className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg font-bold text-foreground">
              {portfolioStats.bestPerformer}
            </div>
            <p className="text-xs text-vault-crypto-DEFAULT font-medium mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +24.5% return
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-foreground">7.2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Moderate risk profile
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart Section */}
      <Card className="premium-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-foreground">Portfolio Performance</CardTitle>
              <CardDescription>
                Track your investment growth over time
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe.value}
                  variant={selectedTimeframe === timeframe.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={cn(
                    "h-8 px-3",
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
        </CardHeader>
        <CardContent>
          {/* Chart Placeholder */}
          <div className="h-80 bg-muted/20 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Performance Chart</h3>
              <p className="text-muted-foreground">
                Interactive chart showing {selectedTimeframe} performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vaults" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border">
          <TabsTrigger value="vaults" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Vault Performance
          </TabsTrigger>
          <TabsTrigger value="allocation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Asset Allocation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Advanced Analytics
          </TabsTrigger>
        </TabsList>

        {/* Vault Performance Tab */}
        <TabsContent value="vaults" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {subscribedVaults.map((vault) => {
              const Icon = vaultIcons[vault.category];
              const colorClass = vaultColors[vault.category];
              const isPositive = vault.cagr > 0;
              
              return (
                <Card key={vault.id} className="premium-card hover:border-primary/40 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "p-2 rounded-xl",
                          `bg-${vault.category === 'tech' ? 'vault-tech-DEFAULT' : vault.category === 'crypto' ? 'vault-crypto-DEFAULT' : vault.category === 'aviation' ? 'vault-aviation-DEFAULT' : 'vault-balanced-DEFAULT'}/10`,
                          `border border-${vault.category === 'tech' ? 'vault-tech-DEFAULT' : vault.category === 'crypto' ? 'vault-crypto-DEFAULT' : vault.category === 'aviation' ? 'vault-aviation-DEFAULT' : 'vault-balanced-DEFAULT'}/20`
                        )}>
                          <Icon className={cn("h-5 w-5", colorClass)} />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{vault.name}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {vault.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn("text-2xl font-bold", colorClass)}>
                          {vault.cagr.toFixed(1)}%
                        </div>
                        <p className="text-xs text-muted-foreground">CAGR</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">vs NASDAQ</span>
                        <div className="flex items-center space-x-1">
                          {vault.vsNasdaq >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-vault-crypto-DEFAULT" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          )}
                          <span className={cn(
                            "font-semibold",
                            vault.vsNasdaq >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                          )}>
                            {vault.vsNasdaq >= 0 ? '+' : ''}{vault.vsNasdaq.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Monthly Fee</span>
                        <span className="font-semibold text-foreground">${vault.monthlyFee}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Your Investment</span>
                        <span className="font-semibold text-foreground">$5,000</span>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Current Value</span>
                          <div className="text-right">
                            <div className="font-bold text-foreground">$5,720</div>
                            <div className={cn(
                              "text-xs flex items-center",
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
              <Card className="premium-card col-span-2">
                <CardContent className="py-12 text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Active Subscriptions</h3>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to vaults to start tracking your performance
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-premium-purple">
                    Browse Vaults
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Asset Allocation Tab */}
        <TabsContent value="allocation" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Asset Allocation</CardTitle>
              <CardDescription>
                Breakdown of your investments across different asset classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/20 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Asset Allocation Chart</h3>
                  <p className="text-muted-foreground">
                    Interactive pie chart showing your portfolio distribution
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Advanced Analytics</CardTitle>
              <CardDescription>
                Deep dive into your portfolio metrics and risk analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/20 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Metrics</h3>
                  <p className="text-muted-foreground">
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