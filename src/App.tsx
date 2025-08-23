import React, { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthDemo } from '@/hooks/useAuth';

function App() {
  const { theme, setTheme } = useUIStore();
  const { user } = useAuthStore();
  const { loginDemo } = useAuthDemo();

  // Apply theme to document on mount and theme changes
  useEffect(() => {
    // Always start with dark theme for premium feel
    document.documentElement.className = 'dark';
    setTheme('dark');
  }, [setTheme]);

  // Development helpers
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    
    if (isDev) {
      // Add helpful console messages for development
      console.log('🚀 xVault MVP Development Mode');
      console.log('💡 Quick login: demo@xvault.com / password');
      console.log('🎯 Auto-login available via: useAuthDemo().loginDemo()');
      
      // Make auth functions available globally for debugging
      (window as any).xvault = {
        loginDemo,
        user,
        theme,
      };
    }
  }, [loginDemo, user, theme]);

  // Global keyboard shortcuts (development)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + L = Quick demo login
      if (e.altKey && e.key === 'l' && import.meta.env.DEV) {
        e.preventDefault();
        if (!user) {
          loginDemo();
          console.log('🔐 Demo login triggered');
        } else {
          console.log('👤 Already logged in as:', user.name);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [loginDemo, user]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Global App Container */}
      <Layout>
        <Dashboard />
      </Layout>

      {/* Development indicator */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 left-2 z-50">
          <div className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-md font-mono">
            DEV
          </div>
        </div>
      )}
    </div>
  );
}

export default App;