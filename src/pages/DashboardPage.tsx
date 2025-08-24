import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BasicText, BasicButton, Icon } from '@/shared/components/atoms';
import { useDashboardStore } from '@/shared/stores/useDashboardStore';
import { useMemberStore } from '@/shared/stores/useMemberStore';
import { ROUTES } from '@/routes/route';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { 
    stats, 
    updateStats, 
    getRecentActivities, 
    addActivity 
  } = useDashboardStore();
  
  const { members } = useMemberStore();
  
  // Update stats based on actual data
  useEffect(() => {
    const activeMembers = members.filter(m => m.status === 'active').length;
    const premiumMembers = members.filter(m => m.plan === 'Premium').length;
    const estimatedRevenue = premiumMembers * 59.99 + (activeMembers - premiumMembers) * 29.99;
    
    updateStats({
      totalMembers: members.length,
      revenue: Math.round(estimatedRevenue),
    });
  }, [members, updateStats]);
  
  const recentActivities = getRecentActivities(4);
  
  const statsData = [
    { 
      label: 'Total Members', 
      value: stats.totalMembers.toLocaleString(), 
      change: '+12%',
      onClick: () => navigate(ROUTES.MEMBERS)
    },
    { 
      label: 'Active Services', 
      value: stats.activeServices.toString(), 
      change: '+8%',
      onClick: () => navigate(ROUTES.SERVICES)
    },
    { 
      label: 'Revenue', 
      value: `$${stats.revenue.toLocaleString()}`, 
      change: '+15%',
      onClick: () => navigate(ROUTES.ANALYTICS)
    },
    { 
      label: 'Growth Rate', 
      value: `${stats.growthRate}%`, 
      change: '+3%',
      onClick: () => navigate(ROUTES.ANALYTICS)
    },
  ];

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add activity for refresh
      addActivity({
        type: 'member_updated',
        message: 'Dashboard data refreshed successfully',
      });
      
      toast.success('Dashboard refreshed successfully!');
    } catch (error) {
      toast.error('Failed to refresh dashboard');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add_member':
        navigate(ROUTES.MEMBERS);
        toast.info('Redirecting to Members page...');
        break;
      case 'new_service':
        navigate(ROUTES.SERVICES);
        toast.info('Redirecting to Services page...');
        break;
      case 'view_reports':
        navigate(ROUTES.ANALYTICS);
        toast.info('Redirecting to Analytics page...');
        break;
      case 'settings':
        navigate(ROUTES.SETTINGS);
        toast.info('Redirecting to Settings page...');
        break;
      default:
        toast.info(`${action} feature coming soon!`);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <BasicText as="h1" variant="heading" size="2xl" className="text-white">
            Dashboard
          </BasicText>
          <BasicText color="muted" className="mt-1 text-white/80">
            Welcome back! Here's what's happening with your business today.
          </BasicText>
        </div>
        <div className="flex gap-2">
          <BasicButton 
            variant="outline" 
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <Icon name="arrow" size="sm" className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </BasicButton>
          <BasicButton 
            onClick={() => handleQuickAction('add_member')}
            className="flex items-center gap-2"
          >
            <Icon name="plus" size="sm" />
            Add New
          </BasicButton>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-white/20"
          >
            <BasicText color="muted" size="sm">
              {stat.label}
            </BasicText>
            <BasicText as="div" variant="heading" size="2xl" className="mt-2">
              {stat.value}
            </BasicText>
            <BasicText
              size="sm"
              color="success"
              className="mt-1 font-medium"
            >
              {stat.change} from last month
            </BasicText>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
          <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
            Recent Activity
          </BasicText>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  activity.type === 'member_added' ? 'bg-green-500' :
                  activity.type === 'payment_received' ? 'bg-blue-500' :
                  activity.type === 'service_created' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
                <BasicText size="sm" className="flex-1">
                  {activity.message}
                </BasicText>
                <BasicText size="xs" color="muted">
                  {formatTimeAgo(activity.timestamp)}
                </BasicText>
              </div>
            ))}
          </div>
          <BasicButton 
            variant="ghost" 
            size="sm" 
            className="mt-4 w-full"
            onClick={() => navigate(ROUTES.ANALYTICS)}
          >
            View All Activity
          </BasicButton>
        </div>

        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
          <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
            Quick Actions
          </BasicText>
          <div className="grid grid-cols-2 gap-3">
            <BasicButton 
              variant="outline" 
              fullWidth
              onClick={() => handleQuickAction('add_member')}
            >
              Add Member
            </BasicButton>
            <BasicButton 
              variant="outline" 
              fullWidth
              onClick={() => handleQuickAction('new_service')}
            >
              New Service
            </BasicButton>
            <BasicButton 
              variant="outline" 
              fullWidth
              onClick={() => handleQuickAction('view_reports')}
            >
              View Reports
            </BasicButton>
            <BasicButton 
              variant="outline" 
              fullWidth
              onClick={() => handleQuickAction('settings')}
            >
              Settings
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
