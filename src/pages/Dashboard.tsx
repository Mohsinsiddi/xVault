import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVaults } from '@/hooks/useVaults';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
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
  Crown,
  Eye
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { vaults, loading } = useVaults();
  const { user, isAuthenticated } = useAuth();
  const { openLoginModal } = useUIStore();
  const navigate = useNavigate();

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

  const handleVaultDetails = (vaultId: string) => {
    navigate(`/vault/${vaultId}`);
  };

  const handleVaultSubscribe = (vault: any) => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    
    // Handle subscription logic here
    console.log('Subscribing to vault:', vault.id);
  };

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-6 sm:py-8 lg:py-12">
      {/* Welcome Section - Responsive */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent leading-tight">
              {isAuthenticated ? `Welcome back, ${user?.name?.split(' ')[0]}!` : 'Welcome to xVault'}
            </h1>
            <p className="text-muted-foreground mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl leading-relaxed">
              {isAuthenticated 
                ? 'Here\'s your investment portfolio overview' 
                : 'Discover premium investment vaults curated by experts'
              }
            </p>
          </div>
          {!isAuthenticated && (
            <Button 
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple hover:from-vault-tech-dark hover:to-premium-purple/90 shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base px-6 sm:px-8 py-3"
              size="lg"
            >
              <Crown className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              Get Started
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview - Responsive Grid */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:border-primary/40 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Total Vaults</CardTitle>
            <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple shadow-md">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{stats.totalVaults}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:border-vault-crypto-DEFAULT/50 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Avg CAGR</CardTitle>
            <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange shadow-md">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-vault-crypto-DEFAULT">
              {stats.avgCagr.toFixed(1)}%
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              Compound annual growth
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:border-vault-aviation-DEFAULT/50 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Subscribers</CardTitle>
            <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan shadow-md">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{stats.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              Active investors
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:border-vault-balanced-DEFAULT/50 hover:shadow-lg group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Best Performer</CardTitle>
            <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple shadow-md">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-vault-balanced-DEFAULT">45.8%</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              Pure Crypto Vault CAGR
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Vaults Section - Responsive Header */}
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Investment Vaults</h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl mt-2">
              Premium curated investment strategies
            </p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center space-x-2 border-2 border-border/60 hover:border-primary/50 hover:bg-accent transition-all duration-200 text-sm sm:text-base px-6 py-3">
            <span>View All</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Vault Cards - Responsive Grid */}
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-2">
          {vaults.map((vault) => {
            const Icon = vaultIcons[vault.category];
            const gradient = vaultGradients[vault.category];
            
            return (
              <Card 
                key={vault.id} 
                className="group hover:shadow-2xl transition-all duration-500 border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:border-primary/40"
              >
                <CardHeader className="pb-4 sm:pb-6">
                  {/* Mobile: Stack vertically, Desktop: Side by side */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 min-w-0 flex-1">
                      <div className={cn(
                        "p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-br shadow-lg group-hover:shadow-xl transition-all duration-300 shrink-0 mx-auto sm:mx-0",
                        gradient
                      )}>
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="min-w-0 flex-1 text-center sm:text-left">
                        <CardTitle className="text-lg sm:text-xl lg:text-2xl group-hover:text-primary transition-colors duration-300 truncate">
                          {vault.name}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0 mt-2 sm:mt-3 justify-center sm:justify-start">
                          <Badge 
                            variant={vault.riskLevel === 'high' ? 'destructive' : 
                                    vault.riskLevel === 'medium' ? 'default' : 'secondary'}
                            className="text-xs font-semibold w-fit mx-auto sm:mx-0"
                          >
                            {vault.riskLevel.toUpperCase()} RISK
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {vault.subscribers.toLocaleString()} subscribers
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CAGR Display - Responsive positioning */}
                    <div className="text-center sm:text-right shrink-0">
                      <div className={cn(
                        "text-3xl sm:text-4xl font-bold transition-colors duration-300",
                        vault.category === 'tech' && "text-vault-tech-DEFAULT",
                        vault.category === 'crypto' && "text-vault-crypto-DEFAULT", 
                        vault.category === 'aviation' && "text-vault-aviation-DEFAULT",
                        vault.category === 'balanced' && "text-vault-balanced-DEFAULT"
                      )}>
                        {vault.cagr.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">CAGR</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 sm:space-y-6">
                  <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground text-center sm:text-left">
                    {vault.description}
                  </CardDescription>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {/* Performance vs Benchmarks - Responsive layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
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
                      <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-muted-foreground">Monthly Fee</span>
                        <span className="font-bold text-foreground">${vault.monthlyFee}</span>
                      </div>
                    </div>
                    
                    {/* Holdings Preview - Responsive wrapping */}
                    <div className="pt-2">
                      <div className="text-xs sm:text-sm text-muted-foreground mb-3 font-medium text-center sm:text-left">TOP HOLDINGS</div>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {vault.holdings.slice(0, 4).map((holding, index) => (
                          <div
                            key={holding.symbol}
                            className="px-3 py-2 bg-muted/80 border border-border/40 rounded-lg text-xs sm:text-sm font-mono font-bold text-foreground hover:bg-muted hover:border-border/60 transition-colors"
                          >
                            {holding.symbol}
                          </div>
                        ))}
                        {vault.holdings.length > 4 && (
                          <div className="px-3 py-2 bg-muted/50 border border-border/30 rounded-lg text-xs sm:text-sm text-muted-foreground">
                            +{vault.holdings.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons - Responsive stacking */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-4 sm:pt-6">
                      <Button 
                        onClick={() => handleVaultSubscribe(vault)}
                        className={cn(
                          "flex-1 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 order-2 sm:order-1 text-sm sm:text-base py-3",
                          `bg-gradient-to-r ${gradient} hover:scale-[1.02]`
                        )}
                      >
                        Subscribe ${vault.monthlyFee}/mo
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleVaultDetails(vault.id)}
                        className="w-full sm:w-auto px-4 sm:px-6 border-2 border-border/60 hover:border-primary/50 hover:bg-accent transition-all duration-200 order-1 sm:order-2 text-sm sm:text-base py-3"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                    
                    {/* Tags - Responsive display */}
                    <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 justify-center sm:justify-start">
                      {vault.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-muted/50 transition-all duration-200"
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

      {/* Quick Actions Section - Responsive */}
      {isAuthenticated && (
        <div className="space-y-6 sm:space-y-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center sm:text-left">Quick Actions</h3>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card 
              onClick={() => navigate('/performance')}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:border-vault-tech-DEFAULT/50 group"
            >
              <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple rounded-xl group-hover:shadow-lg transition-all duration-300 shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground group-hover:text-vault-tech-DEFAULT transition-colors text-sm sm:text-base truncate">Performance</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Track your returns</p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              onClick={() => navigate('/my-vaults')}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:border-vault-aviation-DEFAULT/50 group"
            >
              <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan rounded-xl group-hover:shadow-lg transition-all duration-300 shrink-0">
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground group-hover:text-vault-aviation-DEFAULT transition-colors text-sm sm:text-base truncate">Subscriptions</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manage your vaults</p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              onClick={() => navigate('/pricing')}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:border-vault-balanced-DEFAULT/50 group"
            >
              <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple rounded-xl group-hover:shadow-lg transition-all duration-300 shrink-0">
                  <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground group-hover:text-vault-balanced-DEFAULT transition-colors text-sm sm:text-base truncate">Upgrade Plan</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Unlock more vaults</p>
                </div>
              </CardContent>
            </Card>

            <Card 
              onClick={() => navigate('/analytics')}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-border/60 bg-card/80 backdrop-blur-sm hover:bg-card/90 hover:border-vault-crypto-DEFAULT/50 group"
            >
              <CardContent className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange rounded-xl group-hover:shadow-lg transition-all duration-300 shrink-0">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground group-hover:text-vault-crypto-DEFAULT transition-colors text-sm sm:text-base truncate">Analytics</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Deep insights</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Premium Features Teaser - Responsive */}
      {!isAuthenticated && (
        <Card className="border-2 border-primary/30 bg-gradient-to-r from-card/80 to-primary/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-primary to-premium-purple rounded-xl sm:rounded-2xl shadow-lg shrink-0 mx-auto sm:mx-0">
                  <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">Join xVault Premium</h3>
                  <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                    Access all investment vaults, advanced analytics, and premium features
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 mt-4 sm:mt-6 justify-center sm:justify-start">
                    <div className="flex items-center space-x-2 justify-center sm:justify-start">
                      <div className="w-2 h-2 bg-vault-tech-DEFAULT rounded-full shrink-0"></div>
                      <span className="text-sm sm:text-base text-muted-foreground">All Vaults</span>
                    </div>
                    <div className="flex items-center space-x-2 justify-center sm:justify-start">
                      <div className="w-2 h-2 bg-vault-crypto-DEFAULT rounded-full shrink-0"></div>
                      <span className="text-sm sm:text-base text-muted-foreground">Real-time Analytics</span>
                    </div>
                    <div className="flex items-center space-x-2 justify-center sm:justify-start">
                      <div className="w-2 h-2 bg-vault-aviation-DEFAULT rounded-full shrink-0"></div>
                      <span className="text-sm sm:text-base text-muted-foreground">Priority Support</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto lg:text-right">
                <Button 
                  size="lg"
                  onClick={handleGetStarted}
                  className="w-full lg:w-auto bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base lg:text-lg px-8 py-4"
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