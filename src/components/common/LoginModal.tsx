import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { login, loading } = useAuth();
  const { 
    isLoginModalOpen, 
    closeLoginModal, 
    openRegisterModal,
    showNotification 
  } = useUIStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      closeLoginModal();
      showNotification('Login successful!', 'success');
      
      // Reset form
      setFormData({ email: '', password: '' });
    } catch (error) {
      showNotification('Invalid credentials', 'error');
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login('demo@xvault.com', 'password');
      closeLoginModal();
      showNotification('Demo login successful!', 'success');
    } catch (error) {
      showNotification('Demo login failed', 'error');
    }
  };

  const switchToRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center">
            <span className="text-xl font-bold text-white">x</span>
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sign in to your xVault account to continue
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={cn(
                  "pl-10",
                  errors.email && "border-destructive focus:border-destructive"
                )}
                disabled={loading}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={cn(
                  "pl-10 pr-10",
                  errors.password && "border-destructive focus:border-destructive"
                )}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Demo Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-border hover:bg-accent"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            Try Demo Account
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button
              type="button"
              variant="link"
              className="p-0 text-primary hover:text-primary/80"
              onClick={switchToRegister}
              disabled={loading}
            >
              Sign up
            </Button>
          </div>
        </form>

        {/* Demo Credentials Helper */}
        <div className="mt-6 p-3 bg-muted/20 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Demo Credentials:</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Email:</strong> demo@xvault.com</p>
            <p><strong>Password:</strong> password</p>
            <p className="text-primary mt-2">💡 Tip: Press Option + L (Mac) for quick demo login</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};