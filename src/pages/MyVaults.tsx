import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useVaults } from '@/hooks/useVaults';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { 
  Briefcase,
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  Settings,
  Eye,
  Pause,
  Play,
  X,
  Plus,
  Zap,
  Bitcoin,
  Plane,
  Scale,
  Crown,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const MyVaults: React.FC = () => {
  const { user } = useAuth();
  const { vaults } = useVaults();
  const { showNotification } = useUIStore();
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

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

  const vaultColors = {
    tech: 'text-vault-tech-DEFAULT',
    crypto: 'text-vault-crypto-DEFAULT',
    aviation: 'text-vault-aviation-DEFAULT',
    balanced: 'text-vault-balanced-DEFAULT',
  };

  // Get subscribed vaults
  const subscribedVaults = vaults.filter(vault => 
    user?.subscribedVaults.includes(vault.id)
  );

  // Mock subscription data - replace with real data
  const subscriptionData = subscribedVaults.map(vault => ({
    ...vault,
    subscriptionDate: '2024-01-15',
    status: Math.random() > 0.8 ? 'paused' : 'active' as 'active' | 'paused',
    investedAmount: Math.floor(Math.random() * 10000) + 2000,
    currentValue: Math.floor(Math.random() * 12000) + 2500,
    totalReturns: Math.floor(Math.random() * 2000) + 200,
  }));

  const filteredVaults = subscriptionData.filter(vault => {
    if (filter === 'all') return true;
    return vault.status === filter;
  });

  const handlePauseVault = (vaultId: string, vaultName: string) => {
    showNotification(`${vaultName} subscription paused`, 'info');
  };

  const handleResumeVault = (vaultId: string, vaultName: string) => {
    showNotification(`${vaultName} subscription resumed`, 'success');
  };

  const handleCancelVault = (vaultId: string, vaultName: string) => {
    showNotification(`${vaultName} subscription cancelled`, 'error');
  };

  const handleViewVault = (vaultId: string) => {
    navigate(`/vault/${vaultId}`);
  };

  const totalInvested = subscriptionData.reduce((sum, vault) => sum + vault.investedAmount, 0);
  const totalCurrentValue = subscriptionData.reduce((sum, vault) => sum + vault.currentValue, 0);
  const totalReturns = totalCurrentValue - totalInvested;
  const totalReturnPercentage = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent mb-2">
            My Vaults
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Manage your active vault subscriptions and track performance
          </p>
        </div>
        <Button 
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 w-full sm:w-auto"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Browse Vaults
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Active Subscriptions</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center sm:text-left">
              {subscriptionData.filter(v => v.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center sm:text-left">
              {subscriptionData.filter(v => v.status === 'paused').length} paused
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-crypto-DEFAULT to-premium-orange">
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center sm:text-left">
              ${totalInvested.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center sm:text-left">
              Across {subscriptionData.length} vaults
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Current Value</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-aviation-DEFAULT to-premium-cyan">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center sm:text-left">
              ${totalCurrentValue.toLocaleString()}
            </div>
            <p className={cn(
              "text-xs font-medium mt-1 flex items-center justify-center sm:justify-start",
              totalReturns >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
            )}>
              {totalReturns >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {totalReturns >= 0 ? '+' : ''}${totalReturns.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
            <div className="p-2 rounded-lg bg-gradient-to-br from-vault-balanced-DEFAULT to-premium-purple">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={cn(
              "text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left",
              totalReturnPercentage >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
            )}>
              {totalReturnPercentage >= 0 ? '+' : ''}{totalReturnPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center sm:text-left">
              Overall return rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center sm:justify-start">
        <div className="flex items-center space-x-1 sm:space-x-2 bg-card/50 p-1 rounded-xl border border-border">
          {[
            { id: 'all', label: 'All Vaults', count: subscriptionData.length },
            { id: 'active', label: 'Active', count: subscriptionData.filter(v => v.status === 'active').length },
            { id: 'paused', label: 'Paused', count: subscriptionData.filter(v => v.status === 'paused').length },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={filter === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(tab.id as any)}
              className={cn(
                "rounded-lg transition-all duration-200 text-xs sm:text-sm",
                filter === tab.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs">
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Vault List */}
      <div className="space-y-4">
        {filteredVaults.length > 0 ? (
          filteredVaults.map((vault) => {
            const Icon = vaultIcons[vault.category];
            const gradient = vaultGradients[vault.category];
            const colorClass = vaultColors[vault.category];
            const returnAmount = vault.currentValue - vault.investedAmount;
            const returnPercentage = (returnAmount / vault.investedAmount) * 100;
            
            return (
              <Card key={vault.id} className="premium-card hover:border-primary/40 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className={cn(
                        "p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br shadow-lg",
                        gradient
                      )}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="text-center sm:text-left">
                        <CardTitle className="text-lg sm:text-xl text-foreground flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          <span>{vault.name}</span>
                          <div className="flex items-center space-x-2">
                            {vault.status === 'active' ? (
                              <Badge variant="default" className="bg-vault-crypto-DEFAULT/20 text-vault-crypto-DEFAULT border-vault-crypto-DEFAULT/30 text-xs">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Paused
                              </Badge>
                            )}
                          </div>
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {vault.riskLevel} Risk
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>Since {new Date(vault.subscriptionDate).toLocaleDateString()}</span>
                          </div>
                        </div>
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
                
                <CardContent className="space-y-4 pt-0">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted-foreground mb-1">Invested Amount</p>
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
                        ${vault.investedAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                      <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
                        ${vault.currentValue.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
                      <p className={cn(
                        "text-sm sm:text-base lg:text-lg font-semibold",
                        returnAmount >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                      )}>
                        {returnAmount >= 0 ? '+' : ''}${returnAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-xs text-muted-foreground mb-1">Return %</p>
                      <p className={cn(
                        "text-sm sm:text-base lg:text-lg font-semibold flex items-center justify-center sm:justify-start",
                        returnPercentage >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                      )}>
                        {returnPercentage >= 0 ? (
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        )}
                        {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewVault(vault.id)}
                      className="border-border hover:border-primary/50 text-xs"
                    >
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      View
                    </Button>
                    
                    {vault.status === 'active' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePauseVault(vault.id, vault.name)}
                        className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 text-xs"
                      >
                        <Pause className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResumeVault(vault.id, vault.name)}
                        className="border-vault-crypto-DEFAULT/30 text-vault-crypto-DEFAULT hover:bg-vault-crypto-DEFAULT/10 text-xs"
                      >
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Resume
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-primary/50 text-xs"
                    >
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Settings
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelVault(vault.id, vault.name)}
                      className="border-destructive/30 text-destructive hover:bg-destructive/10 text-xs"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="premium-card">
            <CardContent className="py-12 sm:py-16 text-center">
              <Briefcase className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                {filter === 'all' ? 'No Vault Subscriptions' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Vaults`}
              </h3>
              <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                {filter === 'all' 
                  ? "You haven't subscribed to any vaults yet. Browse our available vaults to start your investment journey."
                  : `You don't have any ${filter} vault subscriptions at the moment.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-primary to-premium-purple text-sm"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Available Vaults
                </Button>
                {user?.plan === 'free' && (
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/pricing')}
                    className="border-border hover:border-primary/50 text-sm"
                    size="sm"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};