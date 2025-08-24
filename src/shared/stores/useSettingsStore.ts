import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserSettings = {
  general: {
    companyName: string;
    websiteUrl: string;
    timeZone: string;
    language: string;
  };
  account: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
  };
};

type SettingsState = {
  settings: UserSettings;
  activeTab: string;
};

type SettingsActions = {
  updateGeneralSettings: (settings: Partial<UserSettings['general']>) => void;
  updateAccountSettings: (settings: Partial<UserSettings['account']>) => void;
  updateNotificationSettings: (settings: Partial<UserSettings['notifications']>) => void;
  updateSecuritySettings: (settings: Partial<UserSettings['security']>) => void;
  setActiveTab: (tab: string) => void;
  resetSettings: () => void;
};

type SettingsStore = SettingsState & SettingsActions;

const defaultSettings: UserSettings = {
  general: {
    companyName: 'SecondChapter',
    websiteUrl: 'https://secondchapter.com',
    timeZone: 'UTC-5',
    language: 'English',
  },
  account: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-01',
  },
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // State
      settings: defaultSettings,
      activeTab: 'general',

      // Actions
      updateGeneralSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            general: { ...state.settings.general, ...newSettings },
          },
        })),

      updateAccountSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            account: { ...state.settings.account, ...newSettings },
          },
        })),

      updateNotificationSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: { ...state.settings.notifications, ...newSettings },
          },
        })),

      updateSecuritySettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            security: { ...state.settings.security, ...newSettings },
          },
        })),

      setActiveTab: (tab) => set({ activeTab: tab }),

      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'settings-store',
    }
  )
);
