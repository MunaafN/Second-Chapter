export const ICON_SRC_MAPPING = {
  dashboard: '/icons/dashboard.svg',
  users: '/icons/users.svg',
  services: '/icons/services.svg',
  chart: '/icons/chart.svg',
  settings: '/icons/settings.svg',
  menu: '/icons/menu.svg',
  close: '/icons/close.svg',
  search: '/icons/search.svg',
  bell: '/icons/bell.svg',
  user: '/icons/user.svg',
  plus: '/icons/plus.svg',
  edit: '/icons/edit.svg',
  delete: '/icons/delete.svg',
  arrow: '/icons/arrow.svg',
} as const;

export type IconName = keyof typeof ICON_SRC_MAPPING;
