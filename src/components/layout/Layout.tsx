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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header - Fixed at top */}
      <Header />
      
      {/* Main container - Below header, full remaining height */}
      <div className="flex flex-1" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Sidebar - Fixed position, non-scrolling */}
        <aside 
          className={cn(
            "bg-card/50 border-r border-border backdrop-blur-sm shrink-0 transition-all duration-300",
            sidebarCollapsed ? "w-0 -ml-64 lg:w-16 lg:ml-0" : "w-64"
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Main content area - With proper gap and scroll */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Content wrapper with padding/gap */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 lg:pl-8"> {/* Left padding creates gap from sidebar */}
              {children}
            </div>
            
            {/* Footer at bottom of scrollable content */}
            <Footer />
          </div>
        </main>
      </div>

      {/* Global Notification System */}
      <Notification />
    </div>
  );
};