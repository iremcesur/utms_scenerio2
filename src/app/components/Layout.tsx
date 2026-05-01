import { Button } from './ui/button';
import { Bell, LogOut, ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import type { User, UserRole } from '../App';

interface LayoutProps {
  user: User;
  currentRole: UserRole;
  onLogout: () => void;
  onSwitchRole?: () => void;
  children: React.ReactNode;
}

export function Layout({ user, currentRole, onLogout, onSwitchRole, children }: LayoutProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div 
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: '#C00000' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <div className="text-gray-900">Transfer Management</div>
                <div className="text-xs text-gray-500">{currentRole}</div>
              </div>
            </div>

            {/* Right Side - User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#C00000' }}></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: '#C00000' }}>
                    {user.name[0]}{user.surname[0]}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm text-gray-900">{user.name} {user.surname}</div>
                    <div className="text-xs text-gray-500">{currentRole}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="text-sm text-gray-900">{user.name} {user.surname}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
