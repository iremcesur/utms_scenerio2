import { useState } from 'react';
import { AppShell } from '../AppShell';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { 
  Users, 
  Calendar, 
  Settings,
  Database,
  Activity,
  Bell,
  Shield,
  Plus,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import type { User } from '../../App';
import { ExternalSystemsMonitor } from './ExternalSystemsMonitor';

interface EnhancedAdminPanelProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type AdminSection = 'dashboard' | 'users' | 'periods' | 'settings' | 'integrations' | 'monitoring';

const MOCK_USERS = [
  { id: '1', name: 'Mehmet Demir', email: 'mehmet.demir@admin.edu.tr', roles: ['OIDB', 'Admin'], status: 'active' },
  { id: '2', name: 'Ayşe Kaya', email: 'ayse.kaya@ydyo.edu.tr', roles: ['YDYO'], status: 'active' },
  { id: '3', name: 'Fatma Şahin', email: 'fatma.sahin@ygk.edu.tr', roles: ['YGK'], status: 'active' },
  { id: '4', name: 'Ali Öztürk', email: 'ali.ozturk@dean.edu.tr', roles: ['Dean'], status: 'active' }
];

const DEPARTMENTS = [
  { id: 'ce', name: 'Computer Engineering', quota3rd: 8, quota5th: 4 },
  { id: 'ee', name: 'Electrical Engineering', quota3rd: 6, quota5th: 3 },
  { id: 'me', name: 'Mechanical Engineering', quota3rd: 7, quota5th: 3 },
  { id: 'ie', name: 'Industrial Engineering', quota3rd: 5, quota5th: 2 }
];

export function EnhancedAdminPanel({ user, onLogout, onSwitchRole }: EnhancedAdminPanelProps) {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [showExternalSystems, setShowExternalSystems] = useState(false);

  if (showExternalSystems) {
    return (
      <AppShell
        user={user}
        currentRole="Admin"
        onLogout={onLogout}
        onSwitchRole={onSwitchRole}
        currentSection="integrations"
        onNavigate={(section) => setCurrentSection(section as AdminSection)}
      >
        <ExternalSystemsMonitor onBack={() => setShowExternalSystems(false)} />
      </AppShell>
    );
  }

  const renderUsersSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-2">User & Role Management</h2>
          <p className="text-gray-600">Manage system users and their access permissions</p>
        </div>
        <Button style={{ backgroundColor: '#4D0D0D' }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Roles</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((u) => (
                <tr key={u.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{u.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{u.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.map((role) => (
                        <Badge key={role} variant="outline" className="text-xs">{role}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 text-xs">{u.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Available Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Student', 'OIDB', 'YDYO', 'YGK', 'Dean', 'Board', 'Admin'].map((role) => (
            <div key={role} className="p-4 border rounded-lg">
              <div className="text-sm text-gray-900 mb-1">{role}</div>
              <div className="text-xs text-gray-600">
                {role === 'Admin' ? 'Full system access' : `${role} permissions`}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPeriodsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Application Periods & Quotas</h2>
        <p className="text-gray-600">Configure application periods and department quotas</p>
      </div>

      {/* Active Period */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Active Application Period</h3>
          <Badge className="bg-green-100 text-green-800">Open</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Academic Year / Semester</Label>
              <Input value="2024-2025 / Spring" />
            </div>
            <div className="space-y-2">
              <Label>Application Start Date</Label>
              <Input type="date" value="2025-01-05" />
            </div>
            <div className="space-y-2">
              <Label>Application End Date</Label>
              <Input type="date" value="2025-01-15" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Results Announcement Date</Label>
              <Input type="date" value="2025-02-01" />
            </div>
            <div className="space-y-2">
              <Label>Appeal Deadline</Label>
              <Input type="date" value="2025-02-06" />
            </div>
            <div className="flex items-center space-x-2 pt-4">
              <Switch id="period-active" defaultChecked />
              <Label htmlFor="period-active">Period Active (Accepting Applications)</Label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button style={{ backgroundColor: '#4D0D0D' }}>
            <Settings className="w-4 h-4 mr-2" />
            Save Period Settings
          </Button>
        </div>
      </Card>

      {/* Department Quotas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Department Transfer Quotas</h3>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Department</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">3rd Semester Quota</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">5th Semester Quota</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Total</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {DEPARTMENTS.map((dept) => (
                <tr key={dept.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-900">{dept.name}</td>
                  <td className="py-3 px-4">
                    <Input type="number" value={dept.quota3rd} className="w-20" />
                  </td>
                  <td className="py-3 px-4">
                    <Input type="number" value={dept.quota5th} className="w-20" />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{dept.quota3rd + dept.quota5th}</td>
                  <td className="py-3 px-4">
                    <Button size="sm" variant="outline">Save</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">System Settings</h2>
        <p className="text-gray-600">Configure system-wide settings and business rules</p>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">File Settings</TabsTrigger>
          <TabsTrigger value="business">Business Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="mt-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Document Upload Settings</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Maximum File Size (MB)</Label>
                  <Input type="number" value="10" />
                </div>
                <div className="space-y-2">
                  <Label>Allowed File Formats</Label>
                  <Input value="PDF, JPG, PNG" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="virus-scan" defaultChecked />
                <Label htmlFor="virus-scan">Enable virus scanning for uploads</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="compression" defaultChecked />
                <Label htmlFor="compression">Auto-compress large files</Label>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Business Rules</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum GPA Requirement</Label>
                  <Input type="number" step="0.01" value="2.50" />
                </div>
                <div className="space-y-2">
                  <Label>Allowed Transfer Semesters</Label>
                  <Input value="3, 5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>TOEFL Minimum Score</Label>
                <Input type="number" value="79" />
              </div>
              <div className="space-y-2">
                <Label>Appeal Period (days after results)</Label>
                <Input type="number" value="5" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-900">Email Notifications</div>
                  <div className="text-xs text-gray-600">Send email updates to students</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-900">SMS Notifications</div>
                  <div className="text-xs text-gray-600">Send SMS for critical updates</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-900">System Alerts</div>
                  <div className="text-xs text-gray-600">Alert admins for system issues</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card className="p-6">
            <h3 className="text-gray-900 mb-4">External API Configuration</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>NVI API Key</Label>
                <Input type="password" value="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>YÖKSİS API Endpoint</Label>
                <Input value="https://yoksis.gov.tr/api/v1" />
              </div>
              <div className="space-y-2">
                <Label>ÖSYM API Key</Label>
                <Input type="password" value="••••••••••••••••" />
              </div>
              <Button variant="outline" onClick={() => setShowExternalSystems(true)}>
                <Activity className="w-4 h-4 mr-2" />
                View Integration Status
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderMonitoringSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">System Monitoring</h2>
        <p className="text-gray-600">Monitor system health, performance, and activity logs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">System Status</div>
              <div className="text-sm text-green-600">Operational</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Database</div>
              <div className="text-sm text-gray-900">98% Health</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Active Users</div>
              <div className="text-2xl text-gray-900">142</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">API Uptime</div>
              <div className="text-sm text-gray-900">99.8%</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Recent System Activity</h3>
          <Button variant="outline" size="sm">View All Logs</Button>
        </div>

        <div className="space-y-2">
          {[
            { time: '10:45', user: 'oidb@admin.edu.tr', action: 'Verified application APP-2025-001234' },
            { time: '10:32', user: 'ydyo@admin.edu.tr', action: 'Approved language document for APP-2025-001235' },
            { time: '09:58', user: 'student@student.edu.tr', action: 'Submitted new application APP-2025-001260' },
            { time: '09:15', user: 'ygk@admin.edu.tr', action: 'Generated ranking list for Computer Engineering' }
          ].map((log, i) => (
            <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded text-sm">
              <div className="text-gray-600 w-16">{log.time}</div>
              <div className="text-gray-600 w-48">{log.user}</div>
              <div className="text-gray-900 flex-1">{log.action}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <AppShell
      user={user}
      currentRole="Admin"
      onLogout={onLogout}
      onSwitchRole={onSwitchRole}
      currentSection={currentSection}
      onNavigate={(section) => setCurrentSection(section as AdminSection)}
    >
      {currentSection === 'dashboard' && renderUsersSection()}
      {currentSection === 'users' && renderUsersSection()}
      {currentSection === 'periods' && renderPeriodsSection()}
      {currentSection === 'settings' && renderSettingsSection()}
      {currentSection === 'monitoring' && renderMonitoringSection()}
      {currentSection === 'integrations' && (
        <div className="text-center py-12">
          <Button 
            style={{ backgroundColor: '#4D0D0D' }}
            onClick={() => setShowExternalSystems(true)}
          >
            <Activity className="w-4 h-4 mr-2" />
            View External Systems Monitor
          </Button>
        </div>
      )}
    </AppShell>
  );
}
