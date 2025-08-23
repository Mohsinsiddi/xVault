import { useAuthStore } from '@/store/authStore';
import { SubscriptionPlan } from '@/utils/types';

// Main authentication hook
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    hasActiveSubscription,
    canAccessVault,
  } = useAuthStore();

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    
    // Computed
    hasActiveSubscription: hasActiveSubscription(),
    isFreePlan: user?.plan === 'free',
    isPremium: user?.plan === 'premium' || user?.plan === 'enterprise',
    isBasic: user?.plan === 'basic',
    isEnterprise: user?.plan === 'enterprise',
    
    // Actions
    login,
    logout,
    register,
    updateProfile,
    canAccessVault,
    
    // User info
    userName: user?.name,
    userEmail: user?.email,
    userPlan: user?.plan,
    userAvatar: user?.avatar,
    memberSince: user?.joinedDate,
  };
};

// Hook for subscription management
export const useSubscription = () => {
  const {
    user,
    loading,
    error,
    upgradePlan,
    cancelSubscription,
    hasActiveSubscription,
  } = useAuthStore();

  const planLimits = {
    free: {
      vaultAccess: 1,
      features: ['Basic dashboard', 'One balanced vault'],
      price: 0,
      maxVaults: 1,
      analytics: false,
      prioritySupport: false,
      apiAccess: false,
    },
    basic: {
      vaultAccess: 2,
      features: ['All dashboards', 'Two premium vaults', 'Email alerts'],
      price: 19.99,
      maxVaults: 2,
      analytics: true,
      prioritySupport: false,
      apiAccess: false,
    },
    premium: {
      vaultAccess: 999,
      features: ['All vaults', 'Advanced analytics', 'Priority support', 'Custom portfolios'],
      price: 49.99,
      maxVaults: 999,
      analytics: true,
      prioritySupport: true,
      apiAccess: true,
    },
    enterprise: {
      vaultAccess: 999,
      features: ['Everything in Premium', 'API access', 'Dedicated support', 'White-label options'],
      price: 199.99,
      maxVaults: 999,
      analytics: true,
      prioritySupport: true,
      apiAccess: true,
    },
  };

  const currentPlan = user?.plan || 'free';
  const currentLimits = planLimits[currentPlan];

  const canUpgrade = (targetPlan: SubscriptionPlan): boolean => {
    const planHierarchy: SubscriptionPlan[] = ['free', 'basic', 'premium', 'enterprise'];
    const currentIndex = planHierarchy.indexOf(currentPlan);
    const targetIndex = planHierarchy.indexOf(targetPlan);
    
    return targetIndex > currentIndex;
  };

  const canDowngrade = (targetPlan: SubscriptionPlan): boolean => {
    const planHierarchy: SubscriptionPlan[] = ['free', 'basic', 'premium', 'enterprise'];
    const currentIndex = planHierarchy.indexOf(currentPlan);
    const targetIndex = planHierarchy.indexOf(targetPlan);
    
    return targetIndex < currentIndex;
  };

  const upgrade = async (plan: SubscriptionPlan) => {
    if (!canUpgrade(plan)) {
      throw new Error('Cannot upgrade to this plan');
    }
    
    await upgradePlan(plan);
  };

  const downgrade = async (plan: SubscriptionPlan) => {
    if (!canDowngrade(plan)) {
      throw new Error('Cannot downgrade to this plan');
    }
    
    await upgradePlan(plan);
  };

  // Calculate subscription value
  const subscriptionValue = user ? {
    monthlySpend: currentLimits.price,
    annualSpend: currentLimits.price * 12,
    vaultsPerDollar: currentLimits.price > 0 ? currentLimits.maxVaults / currentLimits.price : 0,
  } : null;

  return {
    // Current subscription state
    currentPlan,
    currentLimits,
    hasActiveSubscription: hasActiveSubscription(),
    subscriptionValue,
    
    // Plan information
    planLimits,
    availablePlans: Object.keys(planLimits) as SubscriptionPlan[],
    
    // Actions
    upgrade,
    downgrade,
    cancel: cancelSubscription,
    canUpgrade,
    canDowngrade,
    
    // Status
    loading,
    error,
  };
};

// Hook for user profile management
export const useProfile = () => {
  const {
    user,
    loading,
    error,
    updateProfile,
  } = useAuthStore();

  const updateField = async (field: string, value: any) => {
    await updateProfile({ [field]: value });
  };

  const updateMultiple = async (updates: Record<string, any>) => {
    await updateProfile(updates);
  };

  // Calculate user stats
  const stats = user ? {
    totalInvested: user.totalInvested,
    totalReturns: user.totalReturns,
    returnPercentage: user.totalInvested > 0 
      ? (user.totalReturns / user.totalInvested) * 100 
      : 0,
    subscribedVaultsCount: user.subscribedVaults.length,
    membershipDuration: calculateMembershipDuration(user.joinedDate),
    netWorth: user.totalInvested + user.totalReturns,
    isProfit: user.totalReturns > 0,
  } : null;

  // Profile completion percentage
  const profileCompletion = user ? {
    hasName: !!user.name,
    hasEmail: !!user.email,
    hasAvatar: !!user.avatar,
    hasInvestments: user.totalInvested > 0,
    percentage: [
      !!user.name,
      !!user.email, 
      !!user.avatar,
      user.totalInvested > 0
    ].filter(Boolean).length * 25,
  } : null;

  return {
    user,
    stats,
    profileCompletion,
    loading,
    error,
    updateField,
    updateMultiple,
  };
};

// Hook for checking access permissions
export const usePermissions = () => {
  const { user, canAccessVault } = useAuthStore();

  const checkVaultAccess = (vaultId: string) => {
    return canAccessVault(vaultId);
  };

  const getAccessLevel = () => {
    if (!user) return 'guest';
    
    switch (user.plan) {
      case 'enterprise':
        return 'enterprise';
      case 'premium':
        return 'premium';
      case 'basic':
        return 'basic';
      case 'free':
        return 'free';
      default:
        return 'guest';
    }
  };

  const canAccessFeature = (feature: string) => {
    const accessLevel = getAccessLevel();
    
    const featureAccess = {
      'advanced-analytics': ['premium', 'enterprise'],
      'custom-portfolios': ['premium', 'enterprise'],
      'api-access': ['enterprise'],
      'priority-support': ['premium', 'enterprise'],
      'email-alerts': ['basic', 'premium', 'enterprise'],
      'multiple-vaults': ['basic', 'premium', 'enterprise'],
      'performance-reports': ['basic', 'premium', 'enterprise'],
      'real-time-data': ['premium', 'enterprise'],
      'white-label': ['enterprise'],
      'dedicated-support': ['enterprise'],
    };

    const requiredAccess = featureAccess[feature] || [];
    return requiredAccess.includes(accessLevel);
  };

  const getFeatureAccessMessage = (feature: string) => {
    const canAccess = canAccessFeature(feature);
    if (canAccess) return null;

    const accessLevel = getAccessLevel();
    const featureAccess = {
      'advanced-analytics': 'Premium',
      'custom-portfolios': 'Premium', 
      'api-access': 'Enterprise',
      'priority-support': 'Premium',
      'email-alerts': 'Basic',
      'multiple-vaults': 'Basic',
      'performance-reports': 'Basic',
      'real-time-data': 'Premium',
      'white-label': 'Enterprise',
      'dedicated-support': 'Enterprise',
    };

    const requiredPlan = featureAccess[feature] || 'Premium';
    return `Upgrade to ${requiredPlan} to access this feature`;
  };

  return {
    user,
    accessLevel: getAccessLevel(),
    checkVaultAccess,
    canAccessFeature,
    getFeatureAccessMessage,
    isGuest: !user,
    isAuthenticated: !!user,
    hasBasicAccess: ['basic', 'premium', 'enterprise'].includes(getAccessLevel()),
    hasPremiumAccess: ['premium', 'enterprise'].includes(getAccessLevel()),
    hasEnterpriseAccess: getAccessLevel() === 'enterprise',
  };
};

// Hook for demo/development utilities
export const useAuthDemo = () => {
  const { login, register, logout } = useAuthStore();

  const loginDemo = async () => {
    await login('demo@xvault.com', 'password');
  };

  const loginAsUser = async (userType: 'free' | 'basic' | 'premium' | 'enterprise') => {
    const credentials = {
      free: { email: 'free@xvault.com', password: 'password' },
      basic: { email: 'basic@xvault.com', password: 'password' },
      premium: { email: 'premium@xvault.com', password: 'password' },
      enterprise: { email: 'enterprise@xvault.com', password: 'password' },
    };

    const { email, password } = credentials[userType];
    await login(email, password);
  };

  const createTestUser = async (name: string, plan: SubscriptionPlan = 'free') => {
    const email = `${name.toLowerCase()}@test.com`;
    await register(email, 'password', name);
  };

  return {
    loginDemo,
    loginAsUser,
    createTestUser,
    logout,
  };
};

// Utility function to calculate membership duration
const calculateMembershipDuration = (joinedDate: string): string => {
  const joined = new Date(joinedDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - joined.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    
    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  }
};