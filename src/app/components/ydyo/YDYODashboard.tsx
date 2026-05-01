import { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Languages, 
  Clock, 
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import type { User } from '../../App';
import { LanguageReviewDetail } from './LanguageReviewDetail';

interface YDYODashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

const MOCK_APPLICATIONS = [
  {
    id: 'APP-2025-001234',
    studentName: 'Ahmet Yılmaz',
    program: 'Computer Engineering',
    faculty: 'Engineering Faculty',
    languageDoc: 'TOEFL iBT',
    score: '88',
    submittedDate: '2025-01-12',
    status: 'pending'
  },
  {
    id: 'APP-2025-001239',
    studentName: 'Zeynep Kara',
    program: 'Electrical Engineering',
    faculty: 'Engineering Faculty',
    languageDoc: 'YDS',
    score: '75',
    submittedDate: '2025-01-13',
    status: 'pending'
  },
  {
    id: 'APP-2025-001242',
    studentName: 'Mustafa Çelik',
    program: 'Mechanical Engineering',
    faculty: 'Engineering Faculty',
    languageDoc: 'IELTS',
    score: '6.5',
    submittedDate: '2025-01-11',
    status: 'successful'
  },
  {
    id: 'APP-2025-001250',
    studentName: 'Elif Demir',
    program: 'Industrial Engineering',
    faculty: 'Engineering Faculty',
    languageDoc: 'TOEFL iBT',
    score: '92',
    submittedDate: '2025-01-14',
    status: 'exempt'
  },
  {
    id: 'APP-2025-001255',
    studentName: 'Mehmet Aydın',
    program: 'Civil Engineering',
    faculty: 'Engineering Faculty',
    languageDoc: 'IELTS',
    score: '5.5',
    submittedDate: '2025-01-15',
    status: 'unsuccessful'
  }
];

export function YDYODashboard({ user, onLogout, onSwitchRole }: YDYODashboardProps) {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleReview = (appId: string) => {
    setSelectedAppId(appId);
  };

  const handleBackToQueue = () => {
    setSelectedAppId(null);
  };

  // If an application is selected, show the detail view
  if (selectedAppId) {
    return (
      <Layout user={user} currentRole="YDYO" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <LanguageReviewDetail 
          applicationId={selectedAppId}
          onBack={handleBackToQueue}
        />
      </Layout>
    );
  }

  const pendingCount = MOCK_APPLICATIONS.filter(a => a.status === 'pending').length;
  const successfulCount = MOCK_APPLICATIONS.filter(a => a.status === 'successful').length;
  const unsuccessfulCount = MOCK_APPLICATIONS.filter(a => a.status === 'unsuccessful').length;
  const exemptCount = MOCK_APPLICATIONS.filter(a => a.status === 'exempt').length;

  // Filter applications
  const filteredApplications = MOCK_APPLICATIONS.filter(app => {
    const matchesSearch = searchQuery === '' || 
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout user={user} currentRole="YDYO" onLogout={onLogout} onSwitchRole={onSwitchRole}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">YDYO Dashboard</h1>
          <p className="text-gray-600">Foreign Languages Office - Language Proficiency Evaluation</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Pending Review</div>
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
                <div className="text-sm text-gray-600 mb-1">Successful</div>
                <div className="text-2xl text-gray-900">{successfulCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Exempt</div>
                <div className="text-2xl text-gray-900">{exemptCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Unsuccessful</div>
                <div className="text-2xl text-gray-900">{unsuccessfulCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total</div>
                <div className="text-2xl text-gray-900">{MOCK_APPLICATIONS.length}</div>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C00000' }}>
                <Languages className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Language Requirement Guidelines */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Language Proficiency Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-900 mb-2">TOEFL iBT</div>
              <div className="text-xs text-gray-600">Minimum Score: 79</div>
              <div className="text-xs text-gray-600">Exempt: ≥ 90 (+5 bonus)</div>
              <div className="text-xs text-gray-500 mt-1">Valid for 2 years</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-900 mb-2">IELTS Academic</div>
              <div className="text-xs text-gray-600">Minimum Score: 6.0</div>
              <div className="text-xs text-gray-600">Exempt: ≥ 7.0 (+5 bonus)</div>
              <div className="text-xs text-gray-500 mt-1">Valid for 2 years</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-900 mb-2">YDS</div>
              <div className="text-xs text-gray-600">Minimum Score: 70</div>
              <div className="text-xs text-gray-600">Exempt: ≥ 85 (+5 bonus)</div>
              <div className="text-xs text-gray-500 mt-1">Valid for 5 years</div>
            </div>
          </div>
        </Card>

        {/* Applications Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Language Evaluation Queue</h2>
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="successful">Successful</option>
                <option value="exempt">Exempt</option>
                <option value="unsuccessful">Unsuccessful</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Application ID</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Program</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Language Document</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No applications found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{app.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{app.studentName}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{app.program}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{app.languageDoc}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{app.score}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{app.submittedDate}</td>
                      <td className="py-3 px-4">
                        {app.status === 'pending' && (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                        {app.status === 'successful' && (
                          <Badge className="bg-green-100 text-green-800">Successful</Badge>
                        )}
                        {app.status === 'exempt' && (
                          <Badge className="bg-blue-100 text-blue-800">Exempt</Badge>
                        )}
                        {app.status === 'unsuccessful' && (
                          <Badge className="bg-red-100 text-red-800">Unsuccessful</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReview(app.id)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}