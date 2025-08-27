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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Vault Not Found</h2>
        <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
    <div className="space-y-6 animate-fade-in">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-4 hover:bg-accent/50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Vault Header */}
      <Card className="premium-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple rounded-2xl">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">
                  {vault.name}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  {vault.description}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge variant="secondary">{vault.riskLevel} Risk</Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{vault.subscribers.toLocaleString()} subscribers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-vault-tech-DEFAULT">
                {vault.cagr.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">CAGR</p>
              <Button 
                className="mt-4 bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple"
                onClick={handleSubscribe}
                disabled={!canAccessVault(vault.id)}
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
          <div className="flex space-x-1 border-b border-border">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`rounded-b-none border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-transparent'
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
                {tab.premium && <Star className="h-3 w-3 ml-1" />}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Vault Overview</h3>
              <p className="text-muted-foreground">
                Detailed vault information and strategy...
              </p>
            </div>
          )}
          
          {activeTab === 'holdings' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Holdings Breakdown</h3>
              <p className="text-muted-foreground">
                Asset allocation and holdings data...
              </p>
            </div>
          )}
          
          {activeTab === 'performance' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <p className="text-muted-foreground">
                Charts and performance analysis...
              </p>
            </div>
          )}
          
          {activeTab === 'news' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Latest News</h3>
              <p className="text-muted-foreground">
                Market news and updates...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};