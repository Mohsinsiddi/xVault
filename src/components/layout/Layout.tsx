import React, { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Notification } from '@/components/ui/Notification';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();
  const { isAuthenticated, user } = useAuth();

  // Auto-collapse sidebar on mobile/tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // lg breakpoint
        setSidebarCollapsed(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed]);

  // Calculate header height dynamically based on whether stats bar is shown
  const hasStatsBar = isAuthenticated && user;
  const headerHeight = hasStatsBar ? '5.25rem' : '4rem';

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Fixed at top with higher z-index */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <Header />
      </header>
      
      {/* Main container with proper top margin for fixed header */}
      <div 
        className={cn(
          "flex min-h-screen",
          // Top margin to account for fixed header
          hasStatsBar ? "mt-[5.25rem]" : "mt-16" // 84px vs 64px
        )}
      >
        {/* Sidebar - Fixed positioning */}
        <aside 
          className={cn(
            // Base styles with fixed positioning
            "fixed left-0 z-40 bg-card/95 border-r border-border backdrop-blur-sm transition-all duration-300 flex flex-col",
            // Responsive width
            sidebarCollapsed ? "w-16" : "w-64",
            // Mobile handling
            "lg:translate-x-0",
            sidebarCollapsed 
              ? "max-lg:-translate-x-full" 
              : "max-lg:translate-x-0"
          )}
          style={{
            // Dynamic top positioning based on header height
            top: headerHeight,
            // Calculate height properly: full viewport height minus header height
            height: `calc(100vh - ${headerHeight})`
          }}
        >
          {/* Sidebar content with scroll - now uses flex-1 and min-h-0 for proper scrolling */}
          <div className={cn(
            "flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
            "pt-3 lg:pt-2",
            sidebarCollapsed ? "px-2" : "px-0"
          )}>
            <Sidebar collapsed={sidebarCollapsed} />
          </div>
        </aside>

        {/* Mobile overlay */}
        {!sidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            style={{
              top: headerHeight
            }}
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Main content area with flex layout */}
        <main 
          className={cn(
            "flex-1 min-w-0 overflow-x-hidden",
            // Responsive left margin for sidebar
            "lg:ml-64",
            sidebarCollapsed && "lg:ml-16",
            "ml-0",
            // Content padding
            "p-4 sm:p-6"
          )}
        >
          {/* Content wrapper */}
          <div className="w-full min-w-0 max-w-none xl:max-w-7xl xl:mx-auto">
            {children}
          </div>
          
          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Global Notification System */}
      <Notification />
    </div>
  );
};