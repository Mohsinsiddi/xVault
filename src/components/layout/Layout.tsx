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

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header - Sticky at top with higher z-index */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      
      {/* Sidebar - Responsive positioning and sizing */}
      <aside 
        className={cn(
          // Base styles
          "fixed left-0 z-40 bg-card/50 border-r border-border backdrop-blur-sm transition-all duration-300",
          // Responsive positioning - account for header + stats bar
          hasStatsBar ? "top-[5.25rem]" : "top-16", // 84px vs 64px
          "bottom-0", // Extend to bottom of screen
          // Responsive width
          sidebarCollapsed ? "w-16" : "w-64",
          // Mobile handling - hide completely on small screens when collapsed
          "lg:translate-x-0", // Always visible on large screens
          sidebarCollapsed 
            ? "max-lg:-translate-x-full" // Hide on mobile when collapsed
            : "max-lg:translate-x-0" // Show on mobile when expanded
        )}
      >
        {/* Sidebar content with responsive padding and scroll */}
        <div className={cn(
          "h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          // Responsive top padding
          "pt-3 lg:pt-2", // More padding on mobile for better spacing
          // Responsive side padding
          sidebarCollapsed ? "px-2" : "px-0"
        )}>
          <Sidebar collapsed={sidebarCollapsed} />
        </div>
      </aside>

      {/* Mobile overlay - only show when sidebar is expanded on small screens */}
      {!sidebarCollapsed && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/50 z-30",
            // Only show overlay on screens smaller than lg
            "lg:hidden",
            // Position below header including stats
            hasStatsBar ? "top-[5.25rem]" : "top-16"
          )}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main content area - Responsive margins and spacing */}
      <main 
        className={cn(
          "min-h-screen transition-all duration-300 overflow-x-hidden",
          // Responsive left margin for sidebar
          "lg:ml-64", // Full sidebar width on large screens
          sidebarCollapsed && "lg:ml-16", // Collapsed sidebar width on large screens
          "ml-0", // No margin on mobile (sidebar overlays)
          // Responsive padding
          "p-4 sm:p-6", // Smaller padding on mobile
          !sidebarCollapsed && "lg:pl-8" // Extra left padding when sidebar is expanded on desktop
        )}
      >
        {/* Content wrapper with responsive constraints */}
        <div className={cn(
          "w-full min-w-0", // min-w-0 prevents flex children from overflowing
          // Optional: Add max width for very large screens
          "max-w-none xl:max-w-7xl xl:mx-auto"
        )}>
          {children}
        </div>
        
        {/* Footer at bottom of content */}
        <Footer />
      </main>

      {/* Global Notification System */}
      <Notification />
    </div>
  );
};