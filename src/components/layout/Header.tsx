import React from 'react';
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
  ChevronDown 
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { 
    toggleSidebar, 
    openLoginModal, 
    openRegisterModal, 
    openProfileModal 
  } = useUIStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="shrink-0 hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple shadow-lg">
              <span className="text-lg font-bold text-white">x</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple bg-clip-text text-transparent">
                xVault
              </h1>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vaults..."
              className={cn(
                "w-full rounded-xl border border-border bg-card/50 pl-10 pr-4 py-2.5",
                "text-sm placeholder:text-muted-foreground backdrop-blur-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "transition-all duration-200 hover:border-primary/50"
              )}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-premium-orange"
                >
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize flex items-center">
                    <div className={cn(
                      "w-2 h-2 rounded-full mr-1",
                      user?.plan === 'free' && "bg-muted-foreground",
                      user?.plan === 'basic' && "bg-premium-blue",
                      user?.plan === 'premium' && "bg-premium-purple",
                      user?.plan === 'enterprise' && "bg-premium-orange"
                    )} />
                    {user?.plan} Plan
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-3 hover:bg-accent rounded-xl"
                  onClick={openProfileModal}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-premium-purple to-premium-pink flex items-center justify-center ring-2 ring-primary/20">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>

                {/* Quick Actions */}
                <div className="flex items-center space-x-1 border-l border-border pl-3">
                  <Button variant="ghost" size="icon" className="hover:bg-accent">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={logout}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Guest Actions */}
              <Button
                variant="ghost"
                onClick={openLoginModal}
                className="text-sm hover:bg-accent"
              >
                Sign In
              </Button>
              <Button
                onClick={openRegisterModal}
                className="text-sm bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple hover:from-vault-tech-dark hover:to-premium-purple/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};