import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVaults } from '@/hooks/useVaults';
import { useAuth } from '@/hooks/useAuth';
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
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const { vaults } = useVaults();
  const { user, isAuthenticated } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '#',
      icon: LayoutDashboard,
      current: true,
    },
    {
      name: 'My Vaults',
      href: '#',
      icon: Briefcase,
      current: false,
      badge: user?.subscribedVaults.length || 0,
    },
    {
      name: 'Performance',
      href: '#',
      icon: TrendingUp,
      current: false,
    },
    {
      name: 'Analytics',
      href: '#',
      icon: PieChart,
      current: false,
      premium: true,
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

  const secondaryNavigation = [
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Help', href: '#', icon: HelpCircle },
  ];

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
                  "w-full justify-start h-11 rounded-xl transition-all duration-200",
                  collapsed && "px-3 justify-center",
                  item.current 
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent hover:border-border/50",
                  item.premium && user?.plan === 'free' && "opacity-60"
                )}
                disabled={item.premium && user?.plan === 'free'}
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

        {/* Vault Categories */}
        {!collapsed && (
          <div className="pt-8">
            <div className="px-3 pb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Vault Categories
              </h3>
            </div>
            <div className="space-y-2">
              {vaultCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.name}
                    className={cn(
                      "rounded-xl border-2 border-transparent transition-all duration-200 overflow-hidden",
                      "hover:border-border/50 hover:bg-accent/30 cursor-pointer"
                    )}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 rounded-xl border-none hover:bg-transparent"
                    >
                      <div className={cn(
                        "p-2 rounded-lg mr-3",
                        category.bgColor,
                        `border ${category.borderColor}`
                      )}>
                        <Icon className={cn("h-4 w-4", category.color)} />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-sm font-medium text-foreground">{category.name}</span>
                      </div>
                      {category.count > 0 && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "ml-auto text-xs",
                            category.borderColor,
                            category.color,
                            "bg-transparent"
                          )}
                        >
                          {category.count}
                        </Badge>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
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
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200",
                  collapsed && "px-3 justify-center"
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Button>
            );
          })}
        </div>
        
        {/* Collapsed User Avatar */}
        {collapsed && isAuthenticated && (
          <div className="mt-4 flex justify-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center border border-primary/20">
              <User className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};