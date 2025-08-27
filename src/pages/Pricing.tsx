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
    <div className="space-y-8 sm:space-y-12 lg:space-y-16 animate-fade-in px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <div className="text-center space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-premium-purple bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg lg:text-xl xl:text-2xl max-w-3xl mx-auto leading-relaxed">
          Unlock the power of professional investment management with plans designed for every investor
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 sm:space-x-4 bg-card/50 p-1.5 sm:p-2 rounded-2xl border border-border shadow-lg backdrop-blur-sm">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="lg"
            onClick={() => setBillingCycle('monthly')}
            className="rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200"
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === 'annual' ? 'default' : 'ghost'}
            size="lg"
            onClick={() => setBillingCycle('annual')}
            className="rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200"
          >
            Annual
            <Badge variant="secondary" className="ml-2 bg-vault-crypto-DEFAULT/20 text-vault-crypto-DEFAULT text-xs font-semibold">
              <span className="hidden sm:inline">Save up to </span>20%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 sm:gap-8 lg:gap-6 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = isAuthenticated && currentPlan === plan.id;
          const savings = getSavings(plan);

          return (
            <Card 
              key={plan.id} 
              className={cn(
                "premium-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] lg:hover:scale-105 h-full flex flex-col",
                plan.popular && "ring-2 ring-primary ring-opacity-50 shadow-2xl lg:scale-105 lg:z-10",
                isCurrentPlan && "ring-2 ring-vault-crypto-DEFAULT ring-opacity-50"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-premium-purple text-white text-center py-2.5 sm:py-3 text-sm font-semibold z-10">
                  <Sparkles className="inline h-4 w-4 mr-2" />
                  Most Popular
                </div>
              )}
              
              {isCurrentPlan && !plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-vault-crypto-DEFAULT to-premium-orange text-white text-center py-2.5 sm:py-3 text-sm font-semibold z-10">
                  <Check className="inline h-4 w-4 mr-2" />
                  Current Plan
                </div>
              )}

              <CardHeader className={cn(
                "pb-6 flex-shrink-0",
                (plan.popular || (isCurrentPlan && !plan.popular)) && "pt-14 sm:pt-16"
              )}>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                  <div className={cn("p-3 rounded-2xl mx-auto sm:mx-0", plan.bgColor, `border-2 ${plan.borderColor}`)}>
                    <Icon className={cn("h-6 w-6 lg:h-7 lg:w-7", plan.color)} />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <CardTitle className="text-xl lg:text-2xl text-foreground mb-2">{plan.name}</CardTitle>
                    {billingCycle === 'annual' && savings && (
                      <Badge variant="outline" className="text-xs text-vault-crypto-DEFAULT border-vault-crypto-DEFAULT">
                        Save {savings}%
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-center sm:text-left mb-6">
                  <div className="flex items-baseline justify-center sm:justify-start space-x-1 mb-2">
                    <span className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
                      {getDisplayPrice(plan)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-base lg:text-lg text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                  {billingCycle === 'annual' && plan.price > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Billed annually (${plan.yearlyPrice})
                    </p>
                  )}
                </div>
                
                <CardDescription className="text-sm lg:text-base leading-relaxed text-center sm:text-left text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 flex-1 flex flex-col">
                <Button 
                  className={cn(
                    "w-full transition-all duration-200 text-sm lg:text-base py-3 lg:py-4 font-semibold",
                    plan.popular 
                      ? "bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 shadow-lg text-white" 
                      : "bg-gradient-to-r from-vault-tech-DEFAULT to-premium-blue hover:opacity-90 text-white",
                    isCurrentPlan && "bg-gradient-to-r from-vault-crypto-DEFAULT to-premium-orange opacity-60 cursor-not-allowed"
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

                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {feature.included ? (
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4 text-vault-crypto-DEFAULT" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 mt-0.5">
                          <X className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className={cn(
                        "text-sm lg:text-base leading-relaxed",
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
      <div className="hidden xl:block">
        <Card className="premium-card shadow-xl">
          <CardHeader className="text-center space-y-3 sm:space-y-4 py-8">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-foreground">
              Detailed Feature Comparison
            </CardTitle>
            <CardDescription className="text-base lg:text-lg">
              Compare all features across our plans
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 lg:py-6 text-base lg:text-lg text-foreground font-semibold">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 lg:py-6 text-base lg:text-lg text-foreground font-semibold">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((feature, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-4 lg:py-5 text-sm lg:text-base text-foreground font-medium">
                        {feature.name}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center py-4 lg:py-5">
                          {plan.features[index].included ? (
                            <Check className="h-5 w-5 lg:h-6 lg:w-6 text-vault-crypto-DEFAULT mx-auto" />
                          ) : (
                            <X className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground mx-auto" />
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
      <div className="space-y-8 sm:space-y-12">
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Everything you need to know about xVault
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="premium-card hover:shadow-lg transition-all duration-200">
              <CardHeader 
                className="cursor-pointer pb-4 sm:pb-6"
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base sm:text-lg lg:text-xl text-foreground text-left pr-6 leading-relaxed">
                    {faq.question}
                  </CardTitle>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground flex-shrink-0 mt-1" />
                  )}
                </div>
              </CardHeader>
              {expandedFAQ === index && (
                <CardContent className="pt-0 pb-6">
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="premium-card bg-gradient-to-r from-primary/10 to-premium-purple/10 border-primary/20 shadow-2xl">
        <CardContent className="text-center py-12 sm:py-16 lg:py-20 space-y-6 sm:space-y-8">
          <Crown className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-primary mx-auto" />
          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
              Ready to Start Investing?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed">
              Join thousands of investors who trust xVault with their financial future. 
              Start with our free plan or unlock premium features today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto pt-4">
            {!isAuthenticated && (
              <Button 
                size="lg"
                onClick={openLoginModal}
                className="bg-gradient-to-r from-primary to-premium-purple hover:from-primary/90 hover:to-premium-purple/90 shadow-xl w-full sm:w-auto text-sm sm:text-base lg:text-lg px-8 lg:px-12 py-3 lg:py-4"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 ml-2" />
              </Button>
            )}
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/')}
              className="border-border hover:border-primary/50 hover:bg-primary/5 w-full sm:w-auto text-sm sm:text-base lg:text-lg px-8 lg:px-12 py-3 lg:py-4"
            >
              <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              View All Vaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};