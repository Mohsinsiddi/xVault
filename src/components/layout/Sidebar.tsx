import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVaults } from '@/hooks/useVaults';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  PieChart,
  Settings,
  HelpCircle,
  Star,
  Zap,
  Bitcoin,
  Plane,
  Scale,
  Crown,
  User,
  CreditCard,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const { vaults } = useVaults();
  const { user, isAuthenticated } = useAuth();
  const { openLoginModal, showNotification } = useUIStore();
  const location = useLocation();
  const navigate = useNavigate();

  // State for collapsible vault categories
  const [vaultCategoriesExpanded, setVaultCategoriesExpanded] = useState(true);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      current: location.pathname === '/',
    },
    {
      name: 'My Vaults',
      href: '/my-vaults',
      icon: Briefcase,
      current: location.pathname === '/my-vaults',
      badge: user?.subscribedVaults.length || 0,
      protected: true,
    },
    {
      name: 'Performance',
      href: '/performance',
      icon: TrendingUp,
      current: location.pathname === '/performance',
      protected: true,
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: PieChart,
      current: location.pathname === '/analytics',
      premium: true,
      protected: true,
    },
  ];

  const vaultCategories = [
    {
      name: 'Tech + Crypto',
      icon: Zap,
      color: 'text-vault-tech-DEFAULT',
      bgColor: 'bg-vault-tech-DEFAULT/10',
      borderColor: 'border-vault-tech-DEFAULT/20',
      count: vaults.filter(v => v.category === 'tech').length,
      category: 'tech',
    },
    {
      name: 'Pure Crypto',
      icon: Bitcoin,
      color: 'text-vault-crypto-DEFAULT',
      bgColor: 'bg-vault-crypto-DEFAULT/10',
      borderColor: 'border-vault-crypto-DEFAULT/20',
      count: vaults.filter(v => v.category === 'crypto').length,
      category: 'crypto',
    },
    {
      name: 'Aviation',
      icon: Plane,
      color: 'text-vault-aviation-DEFAULT',
      bgColor: 'bg-vault-aviation-DEFAULT/10',
      borderColor: 'border-vault-aviation-DEFAULT/20',
      count: vaults.filter(v => v.category === 'aviation').length,
      category: 'aviation',
    },
    {
      name: 'Balanced',
      icon: Scale,
      color: 'text-vault-balanced-DEFAULT',
      bgColor: 'bg-vault-balanced-DEFAULT/10',
      borderColor: 'border-vault-balanced-DEFAULT/20',
      count: vaults.filter(v => v.category === 'balanced').length,
      category: 'balanced',
    },
  ];

  const handleNavClick = (item: typeof navigation[0]) => {
    console.log('Navigation clicked:', item.name, 'Protected:', item.protected, 'Authenticated:', isAuthenticated);
    
    if (item.protected && !isAuthenticated) {
      console.log('Opening login modal for protected route');
      openLoginModal();
      showNotification('Please login to access this feature', 'info');
      return;
    }
    
    if (item.premium && user?.plan === 'free') {
      console.log('Redirecting to pricing for premium feature');
      showNotification('Upgrade to access premium features', 'info');
      navigate('/pricing');
      return;
    }
    
    console.log('Navigating to:', item.href);
    navigate(item.href);
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category);
    navigate(`/?category=${category}`);
  };

  const handleSettingsClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
      showNotification('Please login to access settings', 'info');
      return;
    }
    navigate('/profile');
  };

  const toggleVaultCategories = () => {
    setVaultCategoriesExpanded(!vaultCategoriesExpanded);
  };

  return (
    <div
      className={cn(
        "h-full bg-card/50 backdrop-blur-sm border-r-2 border-border/80 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={item.current ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 rounded-xl transition-all duration-200 cursor-pointer",
                  collapsed && "px-3 justify-center",
                  item.current 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent hover:border-border/50",
                  item.premium && user?.plan === 'free' && "opacity-60"
                )}
                onClick={() => handleNavClick(item)}
              >
                <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary border-primary/30">
                        {item.badge}
                      </Badge>
                    )}
                    {item.premium && user?.plan === 'free' && (
                      <Crown className="h-4 w-4 text-yellow-500 ml-auto" />
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </div>

        {/* Vault Categories with Collapsible Header */}
        {!collapsed && (
          <div className="pt-8">
            <div className="px-3 pb-2">
              <button
                onClick={toggleVaultCategories}
                className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors py-2 rounded-lg hover:bg-accent/30"
              >
                <span>Vault Categories</span>
                {vaultCategoriesExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Animated collapsible content */}
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              vaultCategoriesExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className="space-y-2 pb-2">
                {vaultCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.name}
                      className={cn(
                        "rounded-xl border-2 border-transparent transition-all duration-200 overflow-hidden",
                        "hover:border-border/50 hover:bg-accent/30 cursor-pointer"
                      )}
                      onClick={() => handleCategoryClick(category.category)}
                    >
                      <div className="w-full flex items-center space-x-3 p-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          category.bgColor,
                          `border ${category.borderColor}`
                        )}>
                          <Icon className={cn("h-4 w-4", category.color)} />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-foreground">{category.name}</span>
                        </div>
                        {category.count > 0 && (
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              category.borderColor,
                              category.color,
                              "bg-transparent"
                            )}
                          >
                            {category.count}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Collapsed state indicator */}
            {!vaultCategoriesExpanded && (
              <div className="px-3 py-2">
                <div className="flex items-center justify-center space-x-1">
                  {vaultCategories.slice(0, 4).map((category) => {
                    const Icon = category.icon;
                    return (
                      <div
                        key={category.name}
                        className={cn(
                          "p-1.5 rounded-lg cursor-pointer",
                          category.bgColor,
                          `border ${category.borderColor}`,
                          "hover:scale-110 transition-transform"
                        )}
                        onClick={() => handleCategoryClick(category.category)}
                        title={category.name}
                      >
                        <Icon className={cn("h-3 w-3", category.color)} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Stats Card */}
        {!collapsed && isAuthenticated && (
          <div className="pt-8">
            <div className="p-4 bg-card/80 rounded-2xl border-2 border-border/60 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center border-2 border-primary/20">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {user?.name}
                  </h4>
                  <div className="flex items-center space-x-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      user?.plan === 'free' && "bg-muted-foreground",
                      user?.plan === 'basic' && "bg-premium-blue",
                      user?.plan === 'premium' && "bg-primary",
                      user?.plan === 'enterprise' && "bg-premium-orange"
                    )} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {user?.plan} Plan
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Invested</span>
                  <span className="font-semibold text-foreground">
                    ${user?.totalInvested.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Returns</span>
                  <span className={cn(
                    "font-semibold",
                    (user?.totalReturns || 0) >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                  )}>
                    {(user?.totalReturns || 0) >= 0 ? '+' : ''}${user?.totalReturns.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Return %</span>
                    <span className={cn(
                      "font-bold",
                      (user?.totalReturns || 0) >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                    )}>
                      {user?.totalInvested && user.totalInvested > 0
                        ? `${((user.totalReturns / user.totalInvested) * 100).toFixed(1)}%`
                        : '0.0%'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {user?.plan === 'free' && (
                <div className="mt-4 pt-3 border-t border-border/50">
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 text-white border border-primary/20"
                    onClick={() => navigate('/pricing')}
                  >
                    <Crown className="h-3 w-3 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t-2 border-border/60 p-4 mt-auto">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200",
              collapsed && "px-3 justify-center"
            )}
            onClick={handleSettingsClick}
          >
            <Settings className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span className="font-medium">Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200",
              collapsed && "px-3 justify-center"
            )}
            onClick={() => window.open('https://help.xvault.com', '_blank')}
          >
            <HelpCircle className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && <span className="font-medium">Help</span>}
          </Button>
        </div>
        
        {/* Collapsed User Avatar */}
        {collapsed && isAuthenticated && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => navigate('/profile')}
              className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <User className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};