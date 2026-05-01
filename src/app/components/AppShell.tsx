import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bell, 
  LogOut, 
  ChevronDown,
  LayoutDashboard,
  FileText,
  List,
  Eye,
  Settings,
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import type { User, UserRole } from '../App';

interface AppShellProps {
  user: User;
  currentRole: UserRole;
  onLogout: () => void;
  onSwitchRole?: () => void;
  children: React.ReactNode;
  currentSection?: string;
  onNavigate?: (section: string) => void;
}

const NAVIGATION_ITEMS: Record<UserRole, { icon: React.ElementType; label: string; section: string }[]> = {
  Student: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: FileText, label: 'My Applications', section: 'applications' },
    { icon: Eye, label: 'Track Status', section: 'track' },
    { icon: Settings, label: 'Settings', section: 'settings' }
  ],
  OIDB: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: List, label: 'Application Pipeline', section: 'pipeline' },
    { icon: FileText, label: 'Intake Queue', section: 'intake' },
    { icon: Eye, label: 'Appeals', section: 'appeals' },
    { icon: BarChart3, label: 'Reports', section: 'reports' },
    { icon: Settings, label: 'Settings', section: 'settings' }
  ],
  YDYO: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: List, label: 'Review Queue', section: 'queue' },
    { icon: FileText, label: 'Decisions', section: 'decisions' },
    { icon: BarChart3, label: 'Reports', section: 'reports' },
    { icon: Settings, label: 'Settings', section: 'settings' }
  ],
  YGK: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: List, label: 'Applicants', section: 'applicants' },
    { icon: Eye, label: 'Evaluations', section: 'evaluations' },
    { icon: BarChart3, label: 'Rankings', section: 'rankings' },
    { icon: FileText, label: 'İntibak', section: 'intibak' },
    { icon: Settings, label: 'Settings', section: 'settings' }
  ],
  Dean: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: List, label: 'Packages', section: 'packages' },
    { icon: Eye, label: 'Review', section: 'review' },
    { icon: BarChart3, label: 'Reports', section: 'reports' },
    { icon: Settings, label: 'Settings', section: 'settings' }
  ],
  Board: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: List, label: 'Pending Packages', section: 'packages' },
    { icon: Eye, label: 'Decisions', section: 'decisions' },
    { icon: BarChart3, label: 'Reports', section: 'reports' }
  ],
  Admin: [
    { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
    { icon: FileText, label: 'Users & Roles', section: 'users' },
    { icon: List, label: 'Periods & Quotas', section: 'periods' },
    { icon: Settings, label: 'System Settings', section: 'settings' },
    { icon: Eye, label: 'Integrations', section: 'integrations' },
    { icon: BarChart3, label: 'Monitoring', section: 'monitoring' }
  ]
};

export function AppShell({ 
  user, 
  currentRole, 
  onLogout, 
  onSwitchRole, 
  children,
  currentSection = 'dashboard',
  onNavigate
}: AppShellProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = NAVIGATION_ITEMS[currentRole] || [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div 
            className="w-10 h-10 rounded flex items-center justify-center mr-3"
            style={{ backgroundColor: '#C00000' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <div className="text-sm text-gray-900">Transfer Portal</div>
              <div className="text-xs text-gray-500">{currentRole}</div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.section;
            return (
              <button
                key={item.section}
                onClick={() => onNavigate?.(item.section)}
                className={`w-full flex items-center px-6 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'bg-red-50 text-gray-900 border-r-2' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={isActive ? { borderRightColor: '#C00000' } : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? '' : 'text-gray-400'}`} />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Period Info */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-600 mb-1">Active Period</div>
            <div className="text-sm text-gray-900">Spring 2024-2025</div>
            <div className="text-xs text-gray-500 mt-1">Ends: Jan 15, 2025</div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded mr-4"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex-1" />

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded mr-4">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C00000' }}></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#C00000' }}>
                {user.name[0]}{user.surname[0]}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-sm text-gray-900">{user.name} {user.surname}</div>
                <div className="text-xs text-gray-500">{currentRole}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="text-sm text-gray-900">{user.name} {user.surname}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                  <Badge className="mt-2 text-xs" style={{ backgroundColor: '#C00000' }}>
                    {currentRole}
                  </Badge>
                </div>
                {onSwitchRole && (
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onSwitchRole();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Switch Role
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
