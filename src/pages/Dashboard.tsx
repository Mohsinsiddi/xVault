import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVaults } from '@/hooks/useVaults';
import { useAuth } from '@/hooks/useAuth';
import { mockDashboardStats } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase,
  DollarSign,
  Target,
  ArrowUpRight,
  Star,
  Zap,
  Bitcoin,
  Plane,
  Scale,
  Crown
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { vaults, loading } = useVaults();
  const { user, isAuthenticated } = useAuth();

  const stats = mockDashboardStats;

  const vaultIcons = {
    tech: Zap,
    crypto: Bitcoin,
    aviation: Plane,
    balanced: Scale,
  };

  const vaultGradients = {
    tech: 'from-vault-tech-DEFAULT to-premium-purple',
    crypto: 'from-vault-crypto-DEFAULT to-premium-orange',
    aviation: 'from-vault-aviation-DEFAULT to-premium-cyan',
    balanced: 'from-vault-balanced-DEFAULT to-premium-purple',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent">
              {isAuthenticated ? `Welcome back, ${user?.name?.split(' ')[0]}!` : 'Welcome to xVault'}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {isAuthenticated 
                ? 'Here\'s your investment portfolio overview' 
                : 'Discover premium investment vaults curated by experts'
              }
            </p>
          </div>
          {!isAuthenticated && (
            <Button className="bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple hover:from-vault-tech-dark hover:to-premium-purple/90 shadow-lg hover:shadow-xl transition-all duration-200">
              <Crown className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-primary/30 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Total Vaults</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple">
              <Briefcase className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.totalVaults}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-vault-crypto-DEFAULT/50 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Avg CAGR</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vault-crypto-DEFAULT">
              {stats.avgCagr.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Compound annual growth
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-vault-aviation-DEFAULT/50 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Subscribers</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stats.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active investors
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:border-vault-balanced-DEFAULT/50 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Best Performer</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple">
              <Target className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-vault-balanced-DEFAULT">45.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pure Crypto Vault CAGR
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Vaults */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Investment Vaults</h2>
            <p className="text-muted-foreground text-lg">
              Premium curated investment strategies
            </p>
          </div>
          <Button variant="outline" className="flex items-center space-x-2 border-border hover:border-primary/50 hover:bg-accent transition-all duration-200">
            <span>View All</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {vaults.map((vault) => {
            const Icon = vaultIcons[vault.category];
            const gradient = vaultGradients[vault.category];
            
            return (
              <Card key={vault.id} className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        "p-3 rounded-2xl bg-gradient-to-br shadow-lg group-hover:shadow-xl transition-all duration-300",
                        gradient
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {vault.name}
                        </CardTitle>
                        <div className="flex items-center space-x-3 mt-2">
                          <Badge 
                            variant={vault.riskLevel === 'high' ? 'destructive' : 
                                    vault.riskLevel === 'medium' ? 'default' : 'secondary'}
                            className="text-xs font-semibold"
                          >
                            {vault.riskLevel.toUpperCase()} RISK
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {vault.subscribers.toLocaleString()} subscribers
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-3xl font-bold transition-colors duration-300",
                        vault.category === 'tech' && "text-vault-tech-DEFAULT",
                        vault.category === 'crypto' && "text-vault-crypto-DEFAULT", 
                        vault.category === 'aviation' && "text-vault-aviation-DEFAULT",
                        vault.category === 'balanced' && "text-vault-balanced-DEFAULT"
                      )}>
                        {vault.cagr.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">CAGR</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {vault.description}
                  </CardDescription>
                  
                  <div className="space-y-4">
                    {/* Performance vs Benchmarks */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">vs NASDAQ</span>
                      <div className="flex items-center space-x-2">
                        {vault.vsNasdaq >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-vault-crypto-DEFAULT" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <span className={cn(
                          "font-bold",
                          vault.vsNasdaq >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                        )}>
                          +{vault.vsNasdaq.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Monthly Fee */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Fee</span>
                      <span className="font-bold text-foreground">${vault.monthlyFee}</span>
                    </div>
                    
                    {/* Holdings Preview */}
                    <div className="pt-2">
                      <div className="text-xs text-muted-foreground mb-3 font-medium">TOP HOLDINGS</div>
                      <div className="flex flex-wrap gap-2">
                        {vault.holdings.slice(0, 5).map((holding, index) => (
                          <div
                            key={holding.symbol}
                            className="px-3 py-1.5 bg-muted/50 rounded-lg text-xs font-mono font-bold text-foreground hover:bg-muted transition-colors"
                          >
                            {holding.symbol}
                          </div>
                        ))}
                        {vault.holdings.length > 5 && (
                          <div className="px-3 py-1.5 bg-muted/30 rounded-lg text-xs text-muted-foreground">
                            +{vault.holdings.length - 5} more
                          </div>
                          )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 pt-6">
                      <Button className={cn(
                        "flex-1 font-semibold shadow-lg hover:shadow-xl transition-all duration-300",
                        `bg-gradient-to-r ${gradient} hover:scale-[1.02]`
                      )}>
                        Subscribe ${vault.monthlyFee}/mo
                      </Button>
                      <Button 
                        variant="outline" 
                        className="px-6 border-border hover:border-primary/50 hover:bg-accent transition-all duration-200"
                      >
                        Details
                      </Button>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      {vault.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all duration-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Section */}
      {isAuthenticated && (
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-vault-tech-DEFAULT/50 group">
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple rounded-xl group-hover:shadow-lg transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground group-hover:text-vault-tech-DEFAULT transition-colors">Performance</h4>
                  <p className="text-sm text-muted-foreground">Track your returns</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-vault-aviation-DEFAULT/50 group">
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan rounded-xl group-hover:shadow-lg transition-all duration-300">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground group-hover:text-vault-aviation-DEFAULT transition-colors">Subscriptions</h4>
                  <p className="text-sm text-muted-foreground">Manage your vaults</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-vault-balanced-DEFAULT/50 group">
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple rounded-xl group-hover:shadow-lg transition-all duration-300">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground group-hover:text-vault-balanced-DEFAULT transition-colors">Upgrade Plan</h4>
                  <p className="text-sm text-muted-foreground">Unlock more vaults</p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-vault-crypto-DEFAULT/50 group">
              <CardContent className="flex items-center space-x-4 p-6">
                <div className="p-3 bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange rounded-xl group-hover:shadow-lg transition-all duration-300">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground group-hover:text-vault-crypto-DEFAULT transition-colors">Analytics</h4>
                  <p className="text-sm text-muted-foreground">Deep insights</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Premium Features Teaser */}
      {!isAuthenticated && (
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-card/50 to-primary/5 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-gradient-to-br from-primary to-premium-purple rounded-2xl shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Join xVault Premium</h3>
                  <p className="text-muted-foreground text-lg">
                    Access all investment vaults, advanced analytics, and premium features
                  </p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-vault-tech-DEFAULT rounded-full"></div>
                      <span className="text-sm text-muted-foreground">All Vaults</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-vault-crypto-DEFAULT rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Real-time Analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-vault-aviation-DEFAULT rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Priority Support</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};