import { ROUTES } from '@/routes/route';
import type { IconName } from '@/shared/components/atoms/Icon';

export type SidebarMenuItem = {
  id: string;
  label: string;
  path: string;
  icon: IconName;
  active?: boolean;
};

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'dashboard',
  },
  {
    id: 'members',
    label: 'Members',
    path: ROUTES.MEMBERS,
    icon: 'users',
  },
  {
    id: 'services',
    label: 'Services',
    path: ROUTES.SERVICES,
    icon: 'services',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: 'chart',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: ROUTES.SETTINGS,
    icon: 'settings',
  },
];
