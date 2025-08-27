import React, { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export const Notification: React.FC = () => {
  const { notification, hideNotification } = useUIStore();

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification?.visible) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification?.visible, hideNotification]);

  if (!notification?.visible) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-500/20 bg-green-50/10 text-green-100';
      case 'error':
        return 'border-red-500/20 bg-red-50/10 text-red-100';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-50/10 text-yellow-100';
      default:
        return 'border-blue-500/20 bg-blue-50/10 text-blue-100';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 w-full max-w-sm">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border p-4 backdrop-blur-sm shadow-lg transition-all duration-300',
          getStyles(),
          'animate-in slide-in-from-top-5 fade-in-0'
        )}
      >
        {getIcon()}
        
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>

        <button
          onClick={hideNotification}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};