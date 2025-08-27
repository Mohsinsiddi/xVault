import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { VaultDetails } from '@/pages/VaultDetails';
import { Performance } from '@/pages/Performance';
import { MyVaults } from '@/pages/MyVaults';
import { Profile } from '@/pages/Profile';
import { Pricing } from '@/pages/Pricing';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthDemo } from '@/hooks/useAuth';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  const { theme, setTheme } = useUIStore();
  const { loginDemo } = useAuthDemo();

  // Apply theme to document on mount and theme changes
  useEffect(() => {
    document.documentElement.className = 'dark';
    setTheme('dark');
  }, [setTheme]);

  // Development helpers
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    
    if (isDev) {
      console.log('🚀 xVault MVP Development Mode');
      console.log('💡 Quick login: demo@xvault.com / password');
      console.log('⌨️ Alt + L for quick demo login');
      
      // Make auth functions available globally for debugging
      (window as any).xvault = {
        loginDemo,
        theme,
      };
    }
  }, [loginDemo, theme]);

  // Global keyboard shortcuts (development)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Alt + L = Quick demo login
      if (e.altKey && e.key === 'l' && import.meta.env.DEV) {
        e.preventDefault();
        const { user } = useAuthStore.getState();
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
  }, [loginDemo]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/vault/:id" element={<VaultDetails />} />
            
            {/* Protected Routes */}
            <Route 
              path="/my-vaults" 
              element={
                <ProtectedRoute>
                  <MyVaults />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/performance" 
              element={
                <ProtectedRoute>
                  <Performance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>

        {/* Development indicator */}
        {import.meta.env.DEV && (
          <div className="fixed bottom-2 left-2 z-50">
            <div className="px-2 py-1 bg-primary text-white text-xs rounded-md font-mono">
              DEV
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;