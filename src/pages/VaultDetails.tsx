import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVault } from '@/hooks/useVaults';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Star, TrendingUp, Users } from 'lucide-react';

export const VaultDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { vault, exists } = useVault(id);
  const { isAuthenticated, canAccessVault } = useAuth();

  // Get active tab from URL params
  const activeTab = searchParams.get('tab') || 'overview';

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  // Handle navigation
  const handleBack = () => navigate(-1);
  const handleSubscribe = () => {
    if (!isAuthenticated) {
      navigate('/', { state: { openLogin: true } });
      return;
    }
    // Handle subscription logic
  };

  // Loading/Error states
  if (!id || !exists) {
    return (
      <div className="text-center py-12 px-4 max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Vault Not Found</h2>
        <Button onClick={() => navigate('/')} size="sm">Back to Dashboard</Button>
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'holdings', label: 'Holdings' },
    { id: 'performance', label: 'Performance' },
    { id: 'news', label: 'News', premium: true },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-2 sm:mb-4 hover:bg-accent/50 w-auto"
        size="sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Vault Header */}
      <Card className="premium-card">
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple rounded-xl sm:rounded-2xl">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl sm:text-2xl text-foreground">
                  {vault.name}
                </CardTitle>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base max-w-md">
                  {vault.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                  <Badge variant="secondary" className="text-xs">{vault.riskLevel} Risk</Badge>
                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{vault.subscribers.toLocaleString()} subscribers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right flex-shrink-0">
              <div className="text-2xl sm:text-3xl font-bold text-vault-tech-DEFAULT">
                {vault.cagr.toFixed(1)}%
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">CAGR</p>
              <Button 
                className="mt-3 sm:mt-4 bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple w-full sm:w-auto"
                onClick={handleSubscribe}
                disabled={!canAccessVault(vault.id)}
                size="sm"
              >
                Subscribe ${vault.monthlyFee}/mo
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Navigation */}
      <Card className="premium-card">
        <CardHeader className="pb-2">
          <div className="flex overflow-x-auto border-b border-border scrollbar-hide">
            <div className="flex space-x-1 min-w-full sm:min-w-0">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`rounded-b-none border-b-2 whitespace-nowrap text-xs sm:text-sm px-3 sm:px-4 flex-shrink-0 ${
                    activeTab === tab.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-transparent'
                  }`}
                  onClick={() => handleTabChange(tab.id)}
                  size="sm"
                >
                  {tab.label}
                  {tab.premium && <Star className="h-3 w-3 ml-1" />}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6">
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">Vault Overview</h3>
              <div className="bg-muted/20 rounded-xl border-2 border-dashed border-border/50 p-6 sm:p-8 text-center">
                <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <p className="text-muted-foreground text-sm sm:text-base">
                  Detailed vault information and strategy overview will be displayed here. This includes investment approach, target allocations, and historical performance data.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'holdings' && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">Holdings Breakdown</h3>
              <div className="bg-muted/20 rounded-xl border-2 border-dashed border-border/50 p-6 sm:p-8 text-center">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground">45%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tech Stocks</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground">25%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Crypto</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground">20%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Bonds</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-foreground">10%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Cash</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Detailed asset allocation and individual holdings data with real-time updates.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'performance' && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">Performance Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-lg sm:text-xl font-bold text-vault-crypto-DEFAULT">+24.5%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">1 Year Return</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-lg sm:text-xl font-bold text-vault-crypto-DEFAULT">+8.2%</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">vs S&P 500</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-4 pb-4">
                    <div className="text-lg sm:text-xl font-bold text-foreground">0.85</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Sharpe Ratio</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-muted/20 rounded-xl border-2 border-dashed border-border/50 p-6 sm:p-8 text-center">
                <p className="text-muted-foreground text-sm sm:text-base">
                  Interactive charts and detailed performance analysis will be displayed here.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'news' && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left flex items-center justify-center sm:justify-start">
                Latest News
                <Star className="h-4 w-4 ml-2 text-premium-purple" />
              </h3>
              <div className="bg-muted/20 rounded-xl border-2 border-dashed border-border/50 p-6 sm:p-8 text-center">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Badge variant="outline" className="border-premium-purple text-premium-purple">
                      Premium Feature
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Real-time market news, analysis, and insights relevant to this vault's holdings. 
                    Available with premium subscription.
                  </p>
                  {!canAccessVault(vault.id) && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-premium-purple text-premium-purple hover:bg-premium-purple/10"
                    >
                      Upgrade to Access
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};