import { create } from 'zustand';

export type ActivityItem = {
  id: string;
  type: 'member_added' | 'member_updated' | 'service_created' | 'payment_received';
  message: string;
  timestamp: string;
  user?: string;
};

type DashboardState = {
  activities: ActivityItem[];
  stats: {
    totalMembers: number;
    activeServices: number;
    revenue: number;
    growthRate: number;
  };
};

type DashboardActions = {
  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void;
  updateStats: (stats: Partial<DashboardState['stats']>) => void;
  getRecentActivities: (limit?: number) => ActivityItem[];
};

type DashboardStore = DashboardState & DashboardActions;

const initialActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'member_added',
    message: 'New member registered: John Smith',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: 'John Smith',
  },
  {
    id: '2',
    type: 'payment_received',
    message: 'Payment received from Premium member',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'service_created',
    message: 'New service created: Advanced Analytics',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'member_updated',
    message: 'Member upgraded to Premium plan',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
];

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // State
  activities: initialActivities,
  stats: {
    totalMembers: 1234,
    activeServices: 56,
    revenue: 45678,
    growthRate: 23,
  },

  // Actions
  addActivity: (activity) =>
    set((state) => ({
      activities: [
        {
          ...activity,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        },
        ...state.activities,
      ].slice(0, 50), // Keep only last 50 activities
    })),

  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),

  getRecentActivities: (limit = 5) => {
    const { activities } = get();
    return activities.slice(0, limit);
  },
}));
