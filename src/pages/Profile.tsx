import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, useProfile, useSubscription } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { 
  User,
  Settings,
  CreditCard,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Edit,
  Save,
  X,
  Crown,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  TrendingUp,
  DollarSign,
  Award,
  LogOut,
  Trash2
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { stats, updateField, loading } = useProfile();
  const { currentPlan, currentLimits } = useSubscription();
  const { showNotification } = useUIStore();
  const navigate = useNavigate();
  
  const [editing, setEditing] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate investor focused on tech and crypto markets',
  });

  const handleEdit = (field: string) => {
    setEditing(field);
  };

  const handleSave = async (field: string) => {
    try {
      await updateField(field, formData[field as keyof typeof formData]);
      setEditing(null);
      showNotification(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully`, 'success');
    } catch (error) {
      showNotification(`Failed to update ${field}`, 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Passionate investor focused on tech and crypto markets',
    });
    setEditing(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    showNotification('Logged out successfully', 'success');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto py-6 sm:py-8 lg:py-12">
      {/* Header */}
      <div className="text-center sm:text-left space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="premium-card">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center border-4 border-primary/20">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover" />
                  ) : (
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-card border-2 border-border hover:bg-accent"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-muted-foreground mb-3 text-sm sm:text-base">{user?.email}</p>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "capitalize font-semibold text-xs sm:text-sm",
                      currentPlan === 'free' && "border-muted-foreground text-muted-foreground",
                      currentPlan === 'basic' && "border-premium-blue text-premium-blue",
                      currentPlan === 'premium' && "border-primary text-primary",
                      currentPlan === 'enterprise' && "border-premium-orange text-premium-orange"
                    )}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full mr-2",
                      currentPlan === 'free' && "bg-muted-foreground",
                      currentPlan === 'basic' && "bg-premium-blue",
                      currentPlan === 'premium' && "bg-primary",
                      currentPlan === 'enterprise' && "bg-premium-orange"
                    )} />
                    {currentPlan} Plan
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Member since {new Date(user?.joinedDate || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            {currentPlan !== 'enterprise' && (
              <Button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-primary to-premium-purple w-full sm:w-auto text-sm sm:text-base"
                size="sm"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="account" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-card/50 border border-border h-auto">
          <TabsTrigger 
            value="account" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-3"
          >
            Account
          </TabsTrigger>
          <TabsTrigger 
            value="subscription" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-3"
          >
            Subscription
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-3"
          >
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm py-2 sm:py-3"
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4 sm:space-y-6">
          <Card className="premium-card">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-foreground">Personal Information</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  {editing === 'name' ? (
                    <>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex-1"
                        disabled={loading}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleSave('name')} disabled={loading} className="flex-1 sm:flex-none">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border text-sm sm:text-base">
                        {formData.name}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleEdit('name')} className="w-full sm:w-auto">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  {editing === 'email' ? (
                    <>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="flex-1"
                        disabled={loading}
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleSave('email')} disabled={loading} className="flex-1 sm:flex-none">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border flex items-center text-sm sm:text-base">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{formData.email}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleEdit('email')} className="w-full sm:w-auto">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border flex items-center text-sm sm:text-base">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    {formData.phone}
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border flex items-center text-sm sm:text-base">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    {formData.location}
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Stats */}
          <Card className="premium-card">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-foreground">Investment Overview</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Your investment statistics and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 rounded-xl bg-vault-tech-DEFAULT/10 border border-vault-tech-DEFAULT/20 mb-2 sm:mb-3 inline-block">
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-vault-tech-DEFAULT" />
                  </div>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{stats?.subscribedVaultsCount || 0}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Active Vaults</p>
                </div>
                <div className="text-center space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 rounded-xl bg-vault-crypto-DEFAULT/10 border border-vault-crypto-DEFAULT/20 mb-2 sm:mb-3 inline-block">
                    <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-vault-crypto-DEFAULT" />
                  </div>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">${stats?.totalInvested.toLocaleString()}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Invested</p>
                </div>
                <div className="text-center space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 rounded-xl bg-vault-aviation-DEFAULT/10 border border-vault-aviation-DEFAULT/20 mb-2 sm:mb-3 inline-block">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-vault-aviation-DEFAULT" />
                  </div>
                  <p className={cn(
                    "text-lg sm:text-2xl font-bold",
                    (stats?.totalReturns || 0) >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                  )}>
                    ${stats?.totalReturns.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Returns</p>
                </div>
                <div className="text-center space-y-2 sm:space-y-3">
                  <div className="p-2 sm:p-3 rounded-xl bg-vault-balanced-DEFAULT/10 border border-vault-balanced-DEFAULT/20 mb-2 sm:mb-3 inline-block">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-vault-balanced-DEFAULT" />
                  </div>
                  <p className={cn(
                    "text-lg sm:text-2xl font-bold",
                    (stats?.returnPercentage || 0) >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                  )}>
                    {(stats?.returnPercentage || 0).toFixed(1)}%
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Return Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-4 sm:space-y-6">
          <Card className="premium-card">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-foreground">Current Plan</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 sm:p-6 bg-card/50 rounded-xl border border-border space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className={cn(
                    "p-2 sm:p-3 rounded-xl mx-auto sm:mx-0",
                    currentPlan === 'free' && "bg-muted/20",
                    currentPlan === 'basic' && "bg-premium-blue/10 border border-premium-blue/20",
                    currentPlan === 'premium' && "bg-primary/10 border border-primary/20",
                    currentPlan === 'enterprise' && "bg-premium-orange/10 border border-premium-orange/20"
                  )}>
                    <Crown className={cn(
                      "h-5 w-5 sm:h-6 sm:w-6",
                      currentPlan === 'free' && "text-muted-foreground",
                      currentPlan === 'basic' && "text-premium-blue",
                      currentPlan === 'premium' && "text-primary",
                      currentPlan === 'enterprise' && "text-premium-orange"
                    )} />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground capitalize">{currentPlan} Plan</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {currentLimits.maxVaults === 999 ? 'Unlimited' : currentLimits.maxVaults} vault access
                    </p>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    ${currentLimits.price}{currentLimits.price > 0 ? '/month' : ''}
                  </p>
                  {currentPlan !== 'enterprise' && (
                    <Button 
                      size="sm" 
                      className="mt-2 w-full lg:w-auto"
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>

              {/* Plan Features */}
              <div className="mt-4 sm:mt-6">
                <h4 className="font-semibold text-foreground mb-3 text-sm sm:text-base">Plan Features</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                  {currentLimits.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="premium-card">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-foreground">Billing History</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                View your recent payments and invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { date: '2024-01-01', amount: '$29.99', status: 'Paid', plan: 'Premium Plan' },
                  { date: '2023-12-01', amount: '$29.99', status: 'Paid', plan: 'Premium Plan' },
                  { date: '2023-11-01', amount: '$29.99', status: 'Paid', plan: 'Premium Plan' },
                ].map((payment, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-card/30 rounded-lg border border-border space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">{payment.plan}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right pl-7 sm:pl-0">
                      <p className="font-semibold text-foreground text-sm sm:text-base">{payment.amount}</p>
                      <Badge variant="outline" className="text-xs text-vault-crypto-DEFAULT border-vault-crypto-DEFAULT mt-1">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card className="premium-card">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-foreground">Password & Security</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Change Password */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-foreground text-sm sm:text-base">Change Password</h4>
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current password"
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button className="w-full text-sm sm:text-base">Update Password</Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="pt-4 sm:pt-6 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Two-Factor Authentication</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4 sm:space-y-6">
          <Card className="premium-card">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-foreground">Notifications</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Choose what notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {[
                { title: 'Email Notifications', desc: 'Receive updates about your investments' },
                { title: 'Push Notifications', desc: 'Get notified about market changes' },
                { title: 'SMS Alerts', desc: 'Critical alerts via text message' },
                { title: 'Weekly Reports', desc: 'Performance summaries every week' },
              ].map((setting, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-card/30 rounded-lg border border-border space-y-3 sm:space-y-0">
                  <div className="flex items-start space-x-3">
                    <Bell className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">{setting.title}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Enable
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="premium-card border-destructive/50">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl text-destructive">Danger Zone</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Irreversible actions that will affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-destructive/5 rounded-lg border border-destructive/20 space-y-3 sm:space-y-0">
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Logout</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Sign out from your account</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleLogout} 
                  className="border-destructive/30 text-destructive hover:bg-destructive/10 w-full sm:w-auto text-sm sm:text-base"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-destructive/5 rounded-lg border border-destructive/20 space-y-3 sm:space-y-0">
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Delete Account</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button 
                  variant="destructive" 
                  className="bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30 w-full sm:w-auto text-sm sm:text-base"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};