import { BasicText, BasicButton } from '@/shared/components/atoms';
import { RevenueChart, UserGrowthChart } from '@/shared/components/molecules';

export default function AnalyticsPage() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,567',
      change: '+12.5%',
      period: 'vs last month',
    },
    {
      title: 'New Customers',
      value: '156',
      change: '+8.2%',
      period: 'vs last month',
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.5%',
      period: 'vs last month',
    },
    {
      title: 'Avg. Order Value',
      value: '$89.50',
      change: '+15.3%',
      period: 'vs last month',
    },
  ];

  const topServices = [
    { name: 'Premium Plan', revenue: '$45,230', growth: '+18%' },
    { name: 'Basic Plan', revenue: '$32,890', growth: '+12%' },
    { name: 'Consulting', revenue: '$23,450', growth: '+25%' },
    { name: 'Training', revenue: '$12,340', growth: '+5%' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BasicText as="h1" variant="heading" size="2xl" className="text-white">
            Analytics
          </BasicText>
          <BasicText color="muted" className="mt-1 text-white/80">
            Track your business performance and insights
          </BasicText>
        </div>
        <div className="flex gap-2">
          <BasicButton variant="outline">Export Report</BasicButton>
          <BasicButton>Generate Report</BasicButton>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
                         <BasicText color="muted" size="sm" className="text-white/80">
               {metric.title}
             </BasicText>
            <BasicText as="div" variant="heading" size="2xl" className="mt-2">
              {metric.value}
            </BasicText>
            <div className="mt-2 flex items-center gap-1">
              <BasicText
                size="sm"
                color={metric.change.startsWith('+') ? 'success' : 'error'}
                weight="medium"
              >
                {metric.change}
              </BasicText>
                             <BasicText size="sm" color="muted" className="text-white/80">
                 {metric.period}
               </BasicText>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
          <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
            Revenue Overview
          </BasicText>
                    <div className="h-64 p-4">
            <RevenueChart />
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
          <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
            User Growth
          </BasicText>
                    <div className="h-64 p-4">
            <UserGrowthChart />
          </div>
        </div>
      </div>

      {/* Top Performing Services */}
      <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
        <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
          Top Performing Services
        </BasicText>
        <div className="space-y-4">
          {topServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <BasicText weight="medium">{service.name}</BasicText>
                                 <BasicText size="sm" color="muted" className="text-white/80">
                   Revenue: {service.revenue}
                 </BasicText>
              </div>
              <BasicText
                size="sm"
                color="success"
                weight="medium"
              >
                {service.growth}
              </BasicText>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
        <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
          Recent Activity
        </BasicText>
        <div className="space-y-3">
          {[
            'New user registration from Premium Plan',
            'Payment received for Consulting Service',
            'Monthly report generated successfully',
            'Service upgrade completed for user #1234',
            'New subscription to Basic Plan',
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <BasicText size="sm">{activity}</BasicText>
                             <BasicText size="xs" color="muted" className="ml-auto text-white/80">
                 {index + 1} hour{index !== 0 ? 's' : ''} ago
               </BasicText>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
