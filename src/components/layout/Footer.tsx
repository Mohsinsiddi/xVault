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

export const Footer: React.FC = () => {
  const { openLoginModal } = useUIStore();
  const { isAuthenticated } = useAuth();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-vault-tech-DEFAULT to-premium-purple shadow-lg">
                <span className="text-sm font-bold text-white">x</span>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-vault-tech-DEFAULT to-premium-purple bg-clip-text text-transparent">
                xVault
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium investment vaults designed for modern investors. 
              Build wealth with professionally curated portfolios.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Investment Vaults
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Performance Tracking
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Portfolio Analytics
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Risk Management
                </Button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Press
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Investors
                </Button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help Center
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  API Documentation
                </Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                  Status Page
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Section */}
        {!isAuthenticated && (
          <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-premium-purple/10 rounded-xl border border-primary/20">
            <div className="text-center space-y-3">
              <h4 className="text-lg font-semibold text-foreground">
                Ready to start investing?
              </h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Join thousands of investors building wealth with our curated investment vaults.
              </p>
              <Button
                onClick={openLoginModal}
                className="bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-xs text-muted-foreground">
                © {currentYear} xVault. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
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
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}