import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  ChevronDown,
  CreditCard,
  BarChart3,
  MoreVertical,
  X
} from 'lucide-react';

// Custom SVG Logo Component
const VaultLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M12 8V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 10L12 12L16 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill="currentColor"
    />
  </svg>
);

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { 
    toggleSidebar, 
    openLoginModal, 
    openRegisterModal, 
    openProfileModal,
    sidebarCollapsed 
  } = useUIStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    openProfileModal();
    setMobileMenuOpen(false);
  };

  const handleUpgradeClick = () => {
    window.location.href = '/pricing';
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 overflow-hidden">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 min-w-0">
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0 hover:bg-accent/80 border border-transparent hover:border-border/50"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple shadow-lg ring-2 ring-primary/20">
              <VaultLogo className="h-6 w-6 text-white" />
            </div>
            <div className="block">
              <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-primary to-violet-500 bg-clip-text">
                xVaultzz
              </h1>
            </div>
          </div>
        </div>

        {/* Center Section - Search (Desktop Only) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4 sm:mx-8 transition-all duration-300 min-w-0">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vaults..."
              className={cn(
                "w-full rounded-xl border-2 border-border/60 bg-card/50 pl-10 pr-4 py-2.5",
                "text-sm placeholder:text-muted-foreground backdrop-blur-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50",
                "transition-all duration-200 hover:border-primary/30 hover:bg-card/70"
              )}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {isAuthenticated ? (
            <>
              {/* Desktop View - Full Controls */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative hover:bg-accent/80 border border-transparent hover:border-border/50">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-premium-orange border-none"
                  >
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  {/* User Info Display */}
                  <div className={cn(
                    "text-right transition-all duration-300",
                    sidebarCollapsed ? "hidden xl:block" : "hidden lg:block"
                  )}>
                    <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                    <div className="flex items-center justify-end space-x-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user?.plan === 'free' && "bg-muted-foreground",
                        user?.plan === 'basic' && "bg-premium-blue",
                        user?.plan === 'premium' && "bg-premium-purple",
                        user?.plan === 'enterprise' && "bg-premium-orange"
                      )} />
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.plan} Plan
                      </p>
                    </div>
                  </div>
                  
                  {/* Profile Menu Button */}
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 px-3 hover:bg-accent/80 rounded-xl border border-transparent hover:border-border/50 transition-all duration-200"
                    onClick={handleProfileClick}
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-premium-purple to-premium-pink flex items-center justify-center ring-2 ring-primary/20 shadow-md">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-all duration-300",
                      sidebarCollapsed ? "hidden xl:block" : "hidden sm:block"
                    )} />
                  </Button>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-1 border-l-2 border-border/60 pl-3">
                    {/* Upgrade Button for non-premium users */}
                    {user?.plan === 'free' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUpgradeClick}
                        className={cn(
                          "bg-gradient-to-r from-primary/10 to-premium-purple/10 border-primary/30 text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-premium-purple/20 transition-all duration-200",
                          sidebarCollapsed ? "hidden xl:flex" : "hidden lg:flex"
                        )}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Upgrade
                      </Button>
                    )}
                    
                    <Button variant="ghost" size="icon" className="hover:bg-accent/80 border border-transparent hover:border-border/50">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={logout}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile View - Compact Menu Button */}
              <div className="lg:hidden flex items-center space-x-2">
                {/* User Avatar */}
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-premium-purple to-premium-pink flex items-center justify-center ring-2 ring-primary/20 shadow-md">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                
                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  className="hover:bg-accent/80 border border-transparent hover:border-border/50"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <MoreVertical className="h-5 w-5" />}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Guest Actions - Desktop */}
              <div className="hidden sm:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={openLoginModal}
                  className="text-sm hover:bg-accent/80 border border-transparent hover:border-border/50"
                >
                  Sign In
                </Button>
                <Button
                  onClick={openRegisterModal}
                  className="text-sm bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple hover:from-vault-tech-dark hover:to-premium-purple/90 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </Button>
              </div>

              {/* Guest Actions - Mobile */}
              <div className="sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  className="hover:bg-accent/80 border border-transparent hover:border-border/50"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <MoreVertical className="h-5 w-5" />}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/60 bg-card/95 backdrop-blur-sm">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search vaults..."
                className={cn(
                  "w-full rounded-xl border-2 border-border/60 bg-card/50 pl-10 pr-4 py-2.5",
                  "text-sm placeholder:text-muted-foreground backdrop-blur-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50",
                  "transition-all duration-200 hover:border-primary/30 hover:bg-card/70"
                )}
              />
            </div>

            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-xl border border-border/40">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-premium-purple to-premium-pink flex items-center justify-center ring-2 ring-primary/20 shadow-md">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                    <div className="flex items-center space-x-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user?.plan === 'free' && "bg-muted-foreground",
                        user?.plan === 'basic' && "bg-premium-blue",
                        user?.plan === 'premium' && "bg-premium-purple",
                        user?.plan === 'enterprise' && "bg-premium-orange"
                      )} />
                      <span className="text-xs text-muted-foreground capitalize">
                        {user?.plan} Plan
                      </span>
                    </div>
                  </div>
                  {/* Notifications in mobile */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-premium-orange border-none"
                    >
                      3
                    </Badge>
                  </Button>
                </div>

                {/* Mobile Actions */}
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    onClick={handleProfileClick}
                    className="w-full justify-start h-12 rounded-xl hover:bg-accent/80"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 rounded-xl hover:bg-accent/80"
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </Button>

                  {user?.plan === 'free' && (
                    <Button
                      onClick={handleUpgradeClick}
                      className="w-full justify-start h-12 rounded-xl bg-gradient-to-r from-primary/10 to-premium-purple/10 border border-primary/30 text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-premium-purple/20"
                    >
                      <CreditCard className="h-5 w-5 mr-3" />
                      Upgrade Plan
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start h-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => { openLoginModal(); setMobileMenuOpen(false); }}
                  variant="ghost"
                  className="w-full justify-start h-12 rounded-xl hover:bg-accent/80"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => { openRegisterModal(); setMobileMenuOpen(false); }}
                  className="w-full justify-start h-12 rounded-xl bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple hover:from-vault-tech-dark hover:to-premium-purple/90"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Stats Bar (Optional - only for authenticated users) */}
      {isAuthenticated && user && (
        <div className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-1.5 min-w-0 overflow-hidden">
            <div className={cn(
              "flex items-center text-xs transition-all duration-300",
              sidebarCollapsed ? "space-x-6" : "space-x-4 lg:space-x-6"
            )}>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Total Invested:</span>
                <span className="font-semibold text-foreground">${user.totalInvested?.toLocaleString() || '0'}</span>
              </div>
              <div className={cn(
                "flex items-center space-x-2",
                sidebarCollapsed ? "hidden sm:flex" : "hidden md:flex"
              )}>
                <span className="text-muted-foreground">Returns:</span>
                <span className={cn(
                  "font-semibold",
                  (user.totalReturns || 0) >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {user.totalReturns >= 0 ? '+' : ''}${user.totalReturns?.toLocaleString() || '0'}
                </span>
              </div>
              <div className={cn(
                "flex items-center space-x-2",
                sidebarCollapsed ? "hidden md:flex" : "hidden lg:flex"
              )}>
                <span className="text-muted-foreground">Return %:</span>
                <span className={cn(
                  "font-bold",
                  (user.totalReturns || 0) >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {user.totalInvested && user.totalInvested > 0
                    ? `${((user.totalReturns / user.totalInvested) * 100).toFixed(1)}%`
                    : '0.0%'
                  }
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">Active Vaults:</span>
              <Badge variant="outline" className="text-xs">
                {user.subscribedVaults?.length || 0}
              </Badge>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};