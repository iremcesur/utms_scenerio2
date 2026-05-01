import { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Shield, 
  Users, 
  Calendar, 
  Settings,
  Database,
  AlertCircle,
  CheckCircle2,
  Activity
} from 'lucide-react';
import type { User } from '../../App';
import { ExternalSystemsMonitor } from './ExternalSystemsMonitor';
import { toast } from 'sonner';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type AdminView = 'dashboard' | 'external-systems';

export function AdminDashboard({ user, onLogout, onSwitchRole }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const handleUpdateSettings = () => {
    toast.success('Settings updated successfully');
  };

  if (currentView === 'external-systems') {
    return (
      <Layout user={user} currentRole="Admin" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <ExternalSystemsMonitor onBack={() => setCurrentView('dashboard')} />
      </Layout>
    );
  }

  return (
    <Layout user={user} currentRole="Admin" onLogout={onLogout} onSwitchRole={onSwitchRole}>
      <div className="space-y-6">
        <div>
          <h1 className="text-gray-900 mb-2">System Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, settings, and system configuration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Users</div>
                <div className="text-2xl text-gray-900">142</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Active Period</div>
                <div className="text-sm text-gray-900">Spring 2025</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">System Status</div>
                <div className="text-sm text-green-600">Operational</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Database</div>
                <div className="text-sm text-gray-900">98% Health</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Application Period Settings */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Application Period Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Application Start Date</Label>
                <Input type="date" defaultValue="2025-01-05" />
              </div>
              <div className="space-y-2">
                <Label>Application End Date</Label>
                <Input type="date" defaultValue="2025-01-15" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Results Announcement Date</Label>
                <Input type="date" defaultValue="2025-02-01" />
              </div>
              <div className="space-y-2">
                <Label>Academic Year / Semester</Label>
                <Input defaultValue="2024-2025 / Spring" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" style={{ backgroundColor: '#4D0D0D' }} onClick={handleUpdateSettings}>
              <Settings className="w-4 h-4 mr-2" />
              Update Period Settings
            </Button>
          </div>
        </Card>

        {/* Quota Management */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Transfer Quotas by Department</h2>
          <div className="space-y-3">
            {[
              { dept: 'Computer Engineering', semester3: 8, semester5: 4 },
              { dept: 'Electrical Engineering', semester3: 6, semester5: 3 },
              { dept: 'Mechanical Engineering', semester3: 7, semester5: 3 },
              { dept: 'Industrial Engineering', semester3: 5, semester5: 2 },
            ].map((quota) => (
              <div key={quota.dept} className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-900">{quota.dept}</div>
                <div className="text-sm text-gray-600">3rd Semester: {quota.semester3}</div>
                <div className="text-sm text-gray-600">5th Semester: {quota.semester5}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Edit Quotas
            </Button>
          </div>
        </Card>

        {/* API Integration Status */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">External API Integration Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">e-Government (TCKN Verification)</div>
                <div className="text-xs text-gray-600">Last sync: 2 minutes ago</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">ÖSYM Database</div>
                <div className="text-xs text-gray-600">Last sync: 5 minutes ago</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">Academic Record System</div>
                <div className="text-xs text-gray-600">Last sync: 1 hour ago</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">Document Authentication Service</div>
                <div className="text-xs text-gray-600">Last sync: 30 minutes ago</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="outline" onClick={() => setCurrentView('external-systems')}>
              <Activity className="w-4 h-4 mr-2" />
              Monitor External Systems
            </Button>
          </div>
        </Card>

        {/* System Logs */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Recent System Activity</h2>
          <div className="space-y-2">
            {[
              { time: '10:45', user: 'oidb@admin.edu.tr', action: 'Verified application APP-2025-001234' },
              { time: '10:32', user: 'ydyo@admin.edu.tr', action: 'Approved language document for APP-2025-001235' },
              { time: '09:58', user: 'student@student.edu.tr', action: 'Submitted new application APP-2025-001260' },
              { time: '09:15', user: 'ygk@admin.edu.tr', action: 'Generated ranking list for Computer Engineering' },
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
    </Layout>
  );
}