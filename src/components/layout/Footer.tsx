import React from 'react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/uiStore';
import { useAuth } from '@/hooks/useAuth';
import { 
  Github, 
  Twitter, 
  Mail, 
  Shield, 
  FileText, 
  HelpCircle,
  TrendingUp,
  Users
} from 'lucide-react';

// Custom SVG Logo Component
const VaultLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M12 8V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 10L12 12L16 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill="currentColor"
    />
  </svg>
);

export const Footer: React.FC = () => {
  const { openLoginModal } = useUIStore();
  const { isAuthenticated } = useAuth();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Brand Section - Full width on mobile */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple shadow-lg">
                <VaultLogo className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple bg-clip-text text-transparent">
                xVaultzz
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Premium investment vaults designed for modern investors. 
              Build wealth with professionally curated portfolios.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/50">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/50">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/50">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-2 shrink-0" />
                  Investment Vaults
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Performance Tracking
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Portfolio Analytics
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Risk Management
                </Button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2 shrink-0" />
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Careers
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Press
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Investors
                </Button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4 text-center sm:text-left">
            <h4 className="font-semibold text-foreground text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 shrink-0" />
                  Help Center
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Contact Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  API Documentation
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-muted-foreground hover:text-foreground justify-center sm:justify-start">
                  Status Page
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Section - Responsive */}
        {!isAuthenticated && (
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-primary/10 to-premium-purple/10 rounded-xl border border-primary/20">
            <div className="text-center space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-foreground">
                Ready to start investing?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xs sm:max-w-md mx-auto">
                Join thousands of investors building wealth with our curated investment vaults.
              </p>
              <Button
                onClick={openLoginModal}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 text-sm"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Section - Responsive Layout */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
            {/* Left side - Copyright and links */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <p className="text-xs text-muted-foreground">
                © {currentYear} xVaultzz. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
                <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
                  <FileText className="h-3 w-3 mr-1" />
                  Privacy Policy
                </Button>
                <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
                  <FileText className="h-3 w-3 mr-1" />
                  Terms of Service
                </Button>
                <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
                  <Shield className="h-3 w-3 mr-1" />
                  Security
                </Button>
              </div>
            </div>
            
            {/* Right side - Status indicator */}
            <div className="flex items-center space-x-2 text-xs text-muted-foreground order-first lg:order-last">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};