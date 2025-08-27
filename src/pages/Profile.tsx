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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent mb-3">
          Profile Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="premium-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-premium-purple flex items-center justify-center border-4 border-primary/20">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-2xl object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-white" />
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-card border-2 border-border hover:bg-accent"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                <p className="text-muted-foreground mb-2">{user?.email}</p>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "capitalize font-semibold",
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
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {new Date(user?.joinedDate || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            {currentPlan !== 'enterprise' && (
              <Button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-primary to-premium-purple"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border">
          <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Account
          </TabsTrigger>
          <TabsTrigger value="subscription" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Subscription
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="flex items-center space-x-2">
                  {editing === 'name' ? (
                    <>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex-1"
                        disabled={loading}
                      />
                      <Button size="sm" onClick={() => handleSave('name')} disabled={loading}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border">
                        {formData.name}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleEdit('name')}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="flex items-center space-x-2">
                  {editing === 'email' ? (
                    <>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="flex-1"
                        disabled={loading}
                      />
                      <Button size="sm" onClick={() => handleSave('email')} disabled={loading}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {formData.email}
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleEdit('email')}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.phone}
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 px-3 py-2 bg-muted/20 rounded-lg border border-border flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.location}
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Stats */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Investment Overview</CardTitle>
              <CardDescription>
                Your investment statistics and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="p-3 rounded-xl bg-vault-tech-DEFAULT/10 border border-vault-tech-DEFAULT/20 mb-3 inline-block">
                    <Briefcase className="h-6 w-6 text-vault-tech-DEFAULT" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats?.subscribedVaultsCount || 0}</p>
                  <p className="text-sm text-muted-foreground">Active Vaults</p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-xl bg-vault-crypto-DEFAULT/10 border border-vault-crypto-DEFAULT/20 mb-3 inline-block">
                    <DollarSign className="h-6 w-6 text-vault-crypto-DEFAULT" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">${stats?.totalInvested.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-xl bg-vault-aviation-DEFAULT/10 border border-vault-aviation-DEFAULT/20 mb-3 inline-block">
                    <TrendingUp className="h-6 w-6 text-vault-aviation-DEFAULT" />
                  </div>
                  <p className={cn(
                    "text-2xl font-bold",
                    (stats?.totalReturns || 0) >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                  )}>
                    ${stats?.totalReturns.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                </div>
                <div className="text-center">
                  <div className="p-3 rounded-xl bg-vault-balanced-DEFAULT/10 border border-vault-balanced-DEFAULT/20 mb-3 inline-block">
                    <Award className="h-6 w-6 text-vault-balanced-DEFAULT" />
                  </div>
                  <p className={cn(
                    "text-2xl font-bold",
                    (stats?.returnPercentage || 0) >= 0 ? "text-vault-crypto-DEFAULT" : "text-destructive"
                  )}>
                    {(stats?.returnPercentage || 0).toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Return Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-6 bg-card/50 rounded-xl border border-border">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    currentPlan === 'free' && "bg-muted/20",
                    currentPlan === 'basic' && "bg-premium-blue/10 border border-premium-blue/20",
                    currentPlan === 'premium' && "bg-primary/10 border border-primary/20",
                    currentPlan === 'enterprise' && "bg-premium-orange/10 border border-premium-orange/20"
                  )}>
                    <Crown className={cn(
                      "h-6 w-6",
                      currentPlan === 'free' && "text-muted-foreground",
                      currentPlan === 'basic' && "text-premium-blue",
                      currentPlan === 'premium' && "text-primary",
                      currentPlan === 'enterprise' && "text-premium-orange"
                    )} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground capitalize">{currentPlan} Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentLimits.maxVaults === 999 ? 'Unlimited' : currentLimits.maxVaults} vault access
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    ${currentLimits.price}{currentLimits.price > 0 ? '/month' : ''}
                  </p>
                  {currentPlan !== 'enterprise' && (
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate('/pricing')}
                    >
                      Upgrade
                    </Button>
                  )}
                </div>
              </div>

              {/* Plan Features */}
              <div className="mt-6">
                <h4 className="font-semibold text-foreground mb-3">Plan Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentLimits.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Billing History</CardTitle>
              <CardDescription>
                View your recent payments and invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2024-01-01', amount: '$29.99', status: 'Paid', plan: 'Premium Plan' },
                  { date: '2023-12-01', amount: '$29.99', status: 'Paid', plan: 'Premium Plan' },
                  { date: '2023-11-01', amount: '$29.99', status: 'Paid', plan: 'Premium Plan' },
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-card/30 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">{payment.plan}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{payment.amount}</p>
                      <Badge variant="outline" className="text-xs text-vault-crypto-DEFAULT border-vault-crypto-DEFAULT">
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
        <TabsContent value="security" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Password & Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Password */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Change Password</h4>
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
                  <Button className="w-full">Update Password</Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Notifications</CardTitle>
              <CardDescription>
                Choose what notifications you'd like to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Email Notifications', desc: 'Receive updates about your investments' },
                { title: 'Push Notifications', desc: 'Get notified about market changes' },
                { title: 'SMS Alerts', desc: 'Critical alerts via text message' },
                { title: 'Weekly Reports', desc: 'Performance summaries every week' },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card/30 rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="premium-card border-destructive/50">
            <CardHeader>
              <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that will affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <div>
                  <h4 className="font-semibold text-foreground">Logout</h4>
                  <p className="text-sm text-muted-foreground">Sign out from your account</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="border-destructive/30 text-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                <div>
                  <h4 className="font-semibold text-foreground">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" className="bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30">
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