export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  MEMBERS: '/members',
  SERVICES: '/services',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
