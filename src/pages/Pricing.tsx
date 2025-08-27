import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth, useSubscription } from '@/hooks/useAuth';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { 
  Crown,
  Check,
  X,
  Star,
  Zap,
  Shield,
  Headphones,
  BarChart3,
  Users,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Pricing: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { currentPlan, upgrade, planLimits } = useSubscription();
  const { showNotification, openLoginModal } = useUIStore();
  const navigate = useNavigate();
  
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started with investments',
      price: 0,
      yearlyPrice: 0,
      icon: Users,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/20',
      borderColor: 'border-muted',
      popular: false,
      features: [
        { name: '1 Balanced vault access', included: true },
        { name: 'Basic dashboard', included: true },
        { name: 'Monthly performance reports', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'All vault types', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom portfolios', included: false },
      ],
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'Great for individual investors exploring multiple strategies',
      price: 19.99,
      yearlyPrice: 199,
      icon: Zap,
      color: 'text-premium-blue',
      bgColor: 'bg-premium-blue/10',
      borderColor: 'border-premium-blue',
      popular: false,
      features: [
        { name: '2 Premium vault access', included: true },
        { name: 'All dashboard features', included: true },
        { name: 'Weekly performance reports', included: true },
        { name: 'Email alerts', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom portfolios', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Perfect for serious investors wanting full access',
      price: 49.99,
      yearlyPrice: 499,
      icon: Crown,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      popular: true,
      features: [
        { name: 'All vault access (unlimited)', included: true },
        { name: 'Advanced analytics & insights', included: true },
        { name: 'Real-time performance tracking', included: true },
        { name: 'Custom portfolio builder', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Advanced risk metrics', included: true },
        { name: 'API access', included: true },
        { name: 'White-label options', included: false },
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For institutions and high-volume investors',
      price: 199.99,
      yearlyPrice: 1999,
      icon: Shield,
      color: 'text-premium-orange',
      bgColor: 'bg-premium-orange/10',
      borderColor: 'border-premium-orange',
      popular: false,
      features: [
        { name: 'Everything in Premium', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'White-label solutions', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Advanced reporting', included: true },
        { name: 'Multi-user accounts', included: true },
        { name: 'SLA guarantee', included: true },
      ],
    },
  ];

  const faqs = [
    {
      question: 'How does xVault work?',
      answer: 'xVault provides curated investment portfolios (vaults) managed by our expert team. You subscribe to vaults that match your investment strategy and risk tolerance, and we handle the portfolio management.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing cycle, and you won\'t be charged for the next period.',
    },
    {
      question: 'What\'s the difference between vault types?',
      answer: 'We offer four main vault categories: Tech+Crypto (high growth potential), Pure Crypto (cryptocurrency focused), Aviation (aerospace industry), and Balanced (diversified across asset classes). Each has different risk levels and expected returns.',
    },
    {
      question: 'Is my money safe with xVault?',
      answer: 'We partner with regulated brokers and use bank-level security. Your investments are held in your name with our partner institutions, and we never have direct access to your funds.',
    },
    {
      question: 'How are the returns calculated?',
      answer: 'Returns are calculated based on the actual performance of the underlying assets in each vault. We show both absolute returns and returns compared to major market indices like NASDAQ.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.',
    },
  ];

  const handleSelectPlan = async (planId: string) => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    if (planId === currentPlan) {
      showNotification('You are already on this plan', 'info');
      return;
    }

    if (planId === 'free') {
      showNotification('Cannot downgrade to free plan from this page', 'error');
      return;
    }

    try {
      await upgrade(planId as any);
      showNotification(`Successfully upgraded to ${planId} plan!`, 'success');
      navigate('/profile?tab=subscription');
    } catch (error) {
      showNotification('Failed to upgrade plan. Please try again.', 'error');
    }
  };

  const getDisplayPrice = (plan: typeof plans[0]) => {
    if (plan.price === 0) return 'Free';
    const price = billingCycle === 'monthly' ? plan.price : plan.yearlyPrice / 12;
    return `$${price.toFixed(2)}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.price === 0) return null;
    const monthlyTotal = plan.price * 12;
    const yearlySavings = monthlyTotal - plan.yearlyPrice;
    const savingsPercent = Math.round((yearlySavings / monthlyTotal) * 100);
    return savingsPercent > 0 ? savingsPercent : null;
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent mb-4">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Unlock the power of professional investment management with plans designed for every investor
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4 bg-card/50 p-1 rounded-2xl border border-border">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('monthly')}
            className="rounded-xl px-6 transition-all duration-200"
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('annual')}
            className="rounded-xl px-6 transition-all duration-200"
          >
            Annual
            <Badge variant="secondary" className="ml-2 bg-vault-crypto-DEFAULT/20 text-vault-crypto-DEFAULT">
              Save up to 20%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = isAuthenticated && currentPlan === plan.id;
          const savings = getSavings(plan);

          return (
            <Card 
              key={plan.id} 
              className={cn(
                "premium-card relative overflow-hidden transition-all duration-300 hover:scale-105",
                plan.popular && "ring-2 ring-primary ring-opacity-50 shadow-2xl scale-105",
                isCurrentPlan && "ring-2 ring-vault-crypto-DEFAULT ring-opacity-50"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-premium-purple text-white text-center py-2 text-sm font-semibold">
                  <Sparkles className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-vault-crypto-DEFAULT to-premium-orange text-white text-center py-2 text-sm font-semibold">
                  <Check className="inline h-4 w-4 mr-1" />
                  Current Plan
                </div>
              )}

              <CardHeader className={cn("pb-4", plan.popular && "pt-12", isCurrentPlan && "pt-12")}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={cn("p-3 rounded-2xl", plan.bgColor, `border ${plan.borderColor}`)}>
                    <Icon className={cn("h-6 w-6", plan.color)} />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                    {billingCycle === 'annual' && savings && (
                      <Badge variant="outline" className="mt-1 text-xs text-vault-crypto-DEFAULT border-vault-crypto-DEFAULT">
                        Save {savings}%
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold text-foreground">
                      {getDisplayPrice(plan)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">
                        /{billingCycle === 'monthly' ? 'month' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && plan.price > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Billed annually (${plan.yearlyPrice})
                    </p>
                  )}
                </div>
                
                <CardDescription className="text-sm leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button 
                  className={cn(
                    "w-full transition-all duration-200",
                    plan.popular 
                      ? "bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 shadow-lg" 
                      : "bg-gradient-to-r from-vault-tech-DEFAULT to-premium-blue hover:opacity-90",
                    isCurrentPlan && "opacity-60 cursor-not-allowed"
                  )}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Current Plan
                    </>
                  ) : plan.id === 'free' ? (
                    'Get Started'
                  ) : (
                    <>
                      Upgrade Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="space-y-3 pt-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-vault-crypto-DEFAULT flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-foreground" : "text-muted-foreground line-through"
                      )}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison Table - Desktop Only */}
      <div className="hidden lg:block">
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground text-center">Detailed Feature Comparison</CardTitle>
            <CardDescription className="text-center">
              Compare all features across our plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 text-foreground font-semibold">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 text-foreground font-semibold">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((feature, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 text-foreground">{feature.name}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center py-3">
                          {plan.features[index].included ? (
                            <Check className="h-4 w-4 text-vault-crypto-DEFAULT mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about xVault
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="premium-card">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground text-left">{faq.question}</CardTitle>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedFAQ === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="premium-card bg-gradient-to-r from-primary/10 to-premium-purple/10 border-primary/20">
        <CardContent className="text-center py-12">
          <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Investing?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust xVault with their financial future. 
            Start with our free plan or unlock premium features today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <Button 
                size="lg"
                onClick={openLoginModal}
                className="bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/')}
              className="border-border hover:border-primary/50"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Vaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};