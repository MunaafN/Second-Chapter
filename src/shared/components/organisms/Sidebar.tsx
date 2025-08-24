import { NavLink } from 'react-router-dom';
import { BasicText, Icon } from '@/shared/components/atoms';
import { SIDEBAR_MENU_ITEMS } from '@/shared/constants/sidebarMenu';
import { useAppStore } from '@/shared/stores/useAppStore';
import classNameMerge from '@/shared/utils/classNameMerge';

export default function Sidebar() {
  const { isSidebarOpen, setSidebarOpen } = useAppStore();

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={classNameMerge([
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white/10 backdrop-blur-md shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 border-r border-white/20',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ])}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-white/20 px-6">
            <BasicText as="h2" variant="heading" size="lg" className="text-white">
              SecondChapter
            </BasicText>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            {SIDEBAR_MENU_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  classNameMerge([
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105',
                    isActive
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                      : 'text-white/80 hover:bg-white/10 hover:text-white',
                  ])
                }
              >
                <Icon name={item.icon} size="md" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/20 p-4">
            <BasicText size="xs" color="muted" align="center" className="text-white/60">
              © 2024 SecondChapter
            </BasicText>
          </div>
        </div>
      </aside>
    </>
  );
}
