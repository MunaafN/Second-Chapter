import { useState } from 'react';
import { toast } from 'react-toastify';
import { BasicText, BasicButton, BasicInput } from '@/shared/components/atoms';
import { useSettingsStore } from '@/shared/stores/useSettingsStore';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    settings,
    activeTab,
    setActiveTab,
    updateGeneralSettings,
    updateAccountSettings,
    updateNotificationSettings,
    updateSecuritySettings,
  } = useSettingsStore();

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  const handleSaveSettings = async (tabType: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${tabType} settings saved successfully!`);
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    updateNotificationSettings({
      [key]: !settings.notifications[key],
    });
    toast.success('Notification preference updated!');
  };

  const handlePasswordChange = async () => {
    const currentPassword = prompt('Enter your current password:');
    const newPassword = prompt('Enter your new password:');
    const confirmPassword = prompt('Confirm your new password:');

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateSecuritySettings({
        lastPasswordChange: new Date().toISOString().split('T')[0],
      });
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateSecuritySettings({
        twoFactorEnabled: !settings.security.twoFactorEnabled,
      });
      toast.success(
        `Two-factor authentication ${!settings.security.twoFactorEnabled ? 'enabled' : 'disabled'}!`
      );
    } catch (error) {
      toast.error('Failed to update two-factor authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <BasicText as="h1" variant="heading" size="2xl" className="text-white">
          Settings
        </BasicText>
        <BasicText color="muted" className="mt-1 text-white/80">
          Manage your account settings and preferences
        </BasicText>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/20">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-white/70 hover:text-white hover:border-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <BasicText as="h2" variant="heading" size="lg">
              General Settings
            </BasicText>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Company Name
                </label>
                <BasicInput 
                  value={settings.general.companyName}
                  onChange={(e) => updateGeneralSettings({ companyName: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Website URL
                </label>
                <BasicInput 
                  value={settings.general.websiteUrl}
                  onChange={(e) => updateGeneralSettings({ websiteUrl: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Time Zone
                </label>
                <select 
                  value={settings.general.timeZone}
                  onChange={(e) => updateGeneralSettings({ timeZone: e.target.value })}
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
                >
                  <option value="UTC-5" className="bg-dark-800 text-white">UTC-5 (Eastern Time)</option>
                  <option value="UTC-6" className="bg-dark-800 text-white">UTC-6 (Central Time)</option>
                  <option value="UTC-7" className="bg-dark-800 text-white">UTC-7 (Mountain Time)</option>
                  <option value="UTC-8" className="bg-dark-800 text-white">UTC-8 (Pacific Time)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Language
                </label>
                <select 
                  value={settings.general.language}
                  onChange={(e) => updateGeneralSettings({ language: e.target.value })}
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
                >
                  <option value="English" className="bg-dark-800 text-white">English</option>
                  <option value="Spanish" className="bg-dark-800 text-white">Spanish</option>
                  <option value="French" className="bg-dark-800 text-white">French</option>
                  <option value="German" className="bg-dark-800 text-white">German</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <BasicText as="h2" variant="heading" size="lg">
              Account Information
            </BasicText>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                                 <label className="block text-sm font-medium text-white mb-1">
                   First Name
                 </label>
                <BasicInput 
                  value={settings.account.firstName}
                  onChange={(e) => updateAccountSettings({ firstName: e.target.value })}
                />
              </div>
              
              <div>
                                 <label className="block text-sm font-medium text-white mb-1">
                   Last Name
                 </label>
                <BasicInput 
                  value={settings.account.lastName}
                  onChange={(e) => updateAccountSettings({ lastName: e.target.value })}
                />
              </div>
              
              <div>
                                 <label className="block text-sm font-medium text-white mb-1">
                   Email Address
                 </label>
                <BasicInput 
                  type="email" 
                  value={settings.account.email}
                  onChange={(e) => updateAccountSettings({ email: e.target.value })}
                />
              </div>
              
              <div>
                                 <label className="block text-sm font-medium text-white mb-1">
                   Phone Number
                 </label>
                <BasicInput 
                  type="tel" 
                  value={settings.account.phone}
                  onChange={(e) => updateAccountSettings({ phone: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <BasicText as="h2" variant="heading" size="lg">
              Notification Preferences
            </BasicText>
            
            <div className="space-y-4">
              {[
                { 
                  key: 'emailNotifications' as const, 
                  label: 'Email notifications', 
                  description: 'Receive updates via email' 
                },
                { 
                  key: 'pushNotifications' as const, 
                  label: 'Push notifications', 
                  description: 'Receive push notifications on your device' 
                },
                { 
                  key: 'smsNotifications' as const, 
                  label: 'SMS notifications', 
                  description: 'Receive important updates via SMS' 
                },
                { 
                  key: 'marketingEmails' as const, 
                  label: 'Marketing emails', 
                  description: 'Receive promotional content and updates' 
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <BasicText weight="medium">{item.label}</BasicText>
                    <BasicText size="sm" color="muted">
                      {item.description}
                    </BasicText>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.notifications[item.key]}
                      onChange={() => handleNotificationToggle(item.key)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <BasicText as="h2" variant="heading" size="lg">
              Security Settings
            </BasicText>
            
            <div className="space-y-6">
              <div>
                <BasicText as="h3" variant="subheading" size="md" className="mb-3">
                  Password Management
                </BasicText>
                                 <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <BasicText weight="medium">Change Password</BasicText>
                      <BasicText size="sm" color="muted">
                        Last changed: {new Date(settings.security.lastPasswordChange).toLocaleDateString()}
                      </BasicText>
                    </div>
                    <BasicButton 
                      variant="outline"
                      onClick={handlePasswordChange}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Change Password'}
                    </BasicButton>
                  </div>
                </div>
              </div>
              
              <div>
                <BasicText as="h3" variant="subheading" size="md" className="mb-3">
                  Two-Factor Authentication
                </BasicText>
                                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <BasicText weight="medium">
                      {settings.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </BasicText>
                    <BasicText size="sm" color="muted">
                      {settings.security.twoFactorEnabled 
                        ? 'Two-factor authentication is currently enabled'
                        : 'Add an extra layer of security to your account'
                      }
                    </BasicText>
                  </div>
                  <BasicButton 
                    variant={settings.security.twoFactorEnabled ? "outline" : "primary"}
                    onClick={handleTwoFactorToggle}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                  </BasicButton>
                </div>
              </div>
            </div>
          </div>
        )}

                 <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
          <BasicButton 
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Reset
          </BasicButton>
          <BasicButton 
            onClick={() => handleSaveSettings(activeTab)}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </BasicButton>
        </div>
      </div>
    </div>
  );
}
