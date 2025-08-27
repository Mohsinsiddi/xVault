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
      {/* Header - Fixed */}
      <Header />
      
      {/* Main Layout - Below header */}
      <div className="flex flex-1 h-[calc(100vh-4rem)]"> {/* 4rem = header height */}
        {/* Sidebar - Fixed position, full height */}
        <aside 
          className={cn(
            "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-200 ease-in-out",
            "top-16", // Start below header
            sidebarCollapsed ? "-translate-x-full lg:w-16 lg:translate-x-0" : "w-64",
            "lg:static lg:z-auto" // Static on desktop
          )}
        >
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Sidebar Overlay (Mobile) */}
        {!sidebarCollapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            style={{ top: '4rem' }} // Start below header
            onClick={() => setSidebarCollapsed(true)}
          />
        )}

        {/* Main Content - Scrollable */}
        <main className={cn(
          "flex-1 flex flex-col overflow-hidden",
          !sidebarCollapsed && "lg:ml-0" // No margin needed since sidebar is static on lg
        )}>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          
          {/* Footer inside scrollable area */}
          <Footer />
        </main>
      </div>

      {/* Global Notification System */}
      <Notification />
    </div>
  );
};