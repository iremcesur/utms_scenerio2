import { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  FileText, 
  Clock, 
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Eye,
  Send,
  AlertTriangle,
  BarChart3
} from 'lucide-react';
import type { User } from '../../App';
import { IntakeVerification } from './IntakeVerification';
import { ReviewAppeals } from './ReviewAppeals';
import { PipelineView } from './PipelineView';

interface OIDBDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type OIDBView = 'dashboard' | 'verify' | 'appeals' | 'pipeline';

// Mock applications data
const MOCK_APPLICATIONS = [
  {
    id: 'APP-2025-001234',
    studentName: 'Ahmet Yılmaz',
    tckn: '12345678901',
    program: 'Computer Engineering',
    submittedDate: '2025-01-10',
    status: 'pending_verification',
    documentsComplete: true
  },
  {
    id: 'APP-2025-001235',
    studentName: 'Ayşe Demir',
    tckn: '98765432101',
    program: 'Electrical Engineering',
    submittedDate: '2025-01-11',
    status: 'pending_verification',
    documentsComplete: true
  },
  {
    id: 'APP-2025-001236',
    studentName: 'Mehmet Kaya',
    tckn: '11223344556',
    program: 'Mechanical Engineering',
    submittedDate: '2025-01-09',
    status: 'returned',
    documentsComplete: false
  },
  {
    id: 'APP-2025-001237',
    studentName: 'Fatma Şahin',
    tckn: '66778899001',
    program: 'Industrial Engineering',
    submittedDate: '2025-01-12',
    status: 'verified',
    documentsComplete: true
  }
];

export function OIDBDashboard({ user, onLogout, onSwitchRole }: OIDBDashboardProps) {
  const [currentView, setCurrentView] = useState<OIDBView>('dashboard');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVerifyApp = (appId: string) => {
    setSelectedApp(appId);
    setCurrentView('verify');
  };

  if (currentView === 'verify' && selectedApp) {
    return (
      <Layout user={user} currentRole="OIDB" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <IntakeVerification 
          applicationId={selectedApp}
          onBack={() => setCurrentView('dashboard')}
        />
      </Layout>
    );
  }

  if (currentView === 'appeals') {
    return (
      <Layout user={user} currentRole="OIDB" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <ReviewAppeals onBack={() => setCurrentView('dashboard')} />
      </Layout>
    );
  }

  if (currentView === 'pipeline') {
    return (
      <Layout user={user} currentRole="OIDB" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <PipelineView 
          onBack={() => setCurrentView('dashboard')} 
          onViewApplication={(appId) => {
            setSelectedApp(appId);
            setCurrentView('verify');
          }}
        />
      </Layout>
    );
  }

  // Filter applications
  const filteredApps = MOCK_APPLICATIONS.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tckn.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const pendingCount = MOCK_APPLICATIONS.filter(a => a.status === 'pending_verification').length;
  const verifiedCount = MOCK_APPLICATIONS.filter(a => a.status === 'verified').length;
  const returnedCount = MOCK_APPLICATIONS.filter(a => a.status === 'returned').length;

  return (
    <Layout user={user} currentRole="OIDB" onLogout={onLogout} onSwitchRole={onSwitchRole}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">ÖİDB Officer Dashboard</h1>
          <p className="text-gray-600">Student Affairs Office - Application Management</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Pending Verification</div>
                <div className="text-2xl text-gray-900">{pendingCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Verified</div>
                <div className="text-2xl text-gray-900">{verifiedCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Returned</div>
                <div className="text-2xl text-gray-900">{returnedCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Applications</div>
                <div className="text-2xl text-gray-900">{MOCK_APPLICATIONS.length}</div>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C00000' }}>
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 justify-start"
            onClick={() => setFilterStatus('pending_verification')}
          >
            <Clock className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="text-sm">Review Pending Applications</div>
              <div className="text-xs text-gray-500 mt-1">{pendingCount} applications awaiting verification</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-4 justify-start"
            onClick={() => setCurrentView('appeals')}
          >
            <AlertTriangle className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="text-sm">Review Appeals</div>
              <div className="text-xs text-gray-500 mt-1">3 appeals pending review</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-4 justify-start"
            onClick={() => setCurrentView('pipeline')}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="text-sm">View Pipeline</div>
              <div className="text-xs text-gray-500 mt-1">Track applications across stages</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-4 justify-start"
          >
            <Send className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="text-sm">Forward to YDYO</div>
              <div className="text-xs text-gray-500 mt-1">Send for language review</div>
            </div>
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by Application ID, Name, or TCKN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-64">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="pending_verification">Pending Verification</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Applications Table */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Applications Queue</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Application ID</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Program</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Documents</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{app.id}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900">{app.studentName}</div>
                      <div className="text-xs text-gray-500">{app.tckn}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{app.program}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{app.submittedDate}</td>
                    <td className="py-3 px-4">
                      {app.status === 'pending_verification' && (
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                      {app.status === 'verified' && (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      )}
                      {app.status === 'returned' && (
                        <Badge className="bg-red-100 text-red-800">Returned</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {app.documentsComplete ? (
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Incomplete</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleVerifyApp(app.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}