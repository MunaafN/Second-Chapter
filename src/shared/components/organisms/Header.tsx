import { BasicButton, BasicText, Icon } from '@/shared/components/atoms';
import { useAppStore } from '@/shared/stores/useAppStore';
import { useThemeStore } from '@/shared/stores/useThemeStore';

export default function Header() {
  const { toggleSidebar, user } = useAppStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/20 bg-white/10 backdrop-blur-md px-4 lg:px-6 shadow-lg">
      <div className="flex items-center gap-4">
        <BasicButton
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden text-white hover:bg-white/20"
          aria-label="Toggle sidebar"
        >
          <Icon name="menu" size="md" />
        </BasicButton>
        
        <BasicText as="h1" variant="heading" size="lg" className="hidden sm:block text-white">
          Dashboard
        </BasicText>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block">
          <div className="relative">
            <Icon 
              name="search" 
              size="sm" 
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" 
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-lg border border-white/30 bg-white/10 py-2 pl-10 pr-4 text-sm text-white placeholder-white/70 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <BasicButton 
          variant="ghost" 
          size="sm" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-white hover:bg-white/20"
        >
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size="md" />
        </BasicButton>

        {/* Notifications */}
        <BasicButton variant="ghost" size="sm" aria-label="Notifications" className="text-white hover:bg-white/20">
          <Icon name="bell" size="md" />
        </BasicButton>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          {user?.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover border-2 border-white/30"
            />
          )}
          <div className="hidden md:block">
            <BasicText size="sm" weight="medium" className="text-white">
              {user?.name}
            </BasicText>
            <BasicText size="xs" color="muted" className="text-white/70">
              {user?.email}
            </BasicText>
          </div>
        </div>
      </div>
    </header>
  );
}
