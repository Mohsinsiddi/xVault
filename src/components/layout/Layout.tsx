import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { Notification } from '@/components/ui/Notification';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Sticky at top with higher z-index */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      
      {/* Sidebar - Fixed to left side, starts below header */}
      <aside 
        className={cn(
          "fixed left-0 z-40 bg-card/50 border-r border-border backdrop-blur-sm transition-all duration-300",
          "top-16 bottom-0", // From header to bottom of screen
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Sidebar content with its own scroll */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          style={{ top: '4rem' }} // Start below header
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main content area - With left margin for sidebar */}
      <main 
        className={cn(
          "min-h-screen transition-all duration-300",
          "pt-0", // No top padding since header is sticky
          sidebarCollapsed ? "ml-16" : "ml-64" // Left margin for sidebar
        )}
      >
        <div className="p-6 lg:pl-8">
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