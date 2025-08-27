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
import { Eye, EyeOff, Mail, Lock, User, Loader2, Crown } from 'lucide-react';

export const RegisterModal: React.FC = () => {
  const { register, loading } = useAuth();
  const { 
    isRegisterModalOpen, 
    closeRegisterModal, 
    openLoginModal,
    showNotification 
  } = useUIStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      closeRegisterModal();
      showNotification('Account created successfully! Welcome to xVault!', 'success');
      
      // Reset form
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      showNotification('Registration failed. Please try again.', 'error');
    }
  };

  const switchToLogin = () => {
    closeRegisterModal();
    openLoginModal();
  };

  return (
    <Dialog open={isRegisterModalOpen} onOpenChange={closeRegisterModal}>
      <DialogContent className="sm:max-w-[440px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            Join xVault
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Create your account to start investing with premium vaults
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={cn(
                  "pl-10 h-10",
                  errors.name && "border-destructive focus:border-destructive"
                )}
                disabled={loading}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

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
                  "pl-10 h-10",
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
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={cn(
                  "pl-10 pr-10 h-10",
                  errors.password && "border-destructive focus:border-destructive"
                )}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
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
            {formData.password && (
              <div className="text-xs text-muted-foreground">
                Password strength: {
                  formData.password.length < 6 ? 'Weak' :
                  formData.password.length < 10 ? 'Medium' : 'Strong'
                }
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={cn(
                  "pl-10 pr-10 h-10",
                  errors.confirmPassword && "border-destructive focus:border-destructive"
                )}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-10 px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Privacy */}
          <div className="text-xs text-muted-foreground leading-relaxed">
            By creating an account, you agree to our{' '}
            <button type="button" className="text-primary hover:underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary hover:underline">
              Privacy Policy
            </button>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="w-full h-10 bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <Crown className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Button
              type="button"
              variant="link"
              className="p-0 text-primary hover:text-primary/80"
              onClick={switchToLogin}
              disabled={loading}
            >
              Sign in
            </Button>
          </div>
        </form>

        {/* Benefits Preview */}
        <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-premium-purple/10 rounded-lg border border-primary/20">
          <h4 className="text-sm font-semibold text-foreground mb-2">What you get:</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>✨ Access to curated investment vaults</p>
            <p>📊 Professional portfolio management</p>
            <p>📈 Real-time performance tracking</p>
            <p>🎯 Personalized investment strategies</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};