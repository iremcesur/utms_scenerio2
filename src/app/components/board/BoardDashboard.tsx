import { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Scale, CheckCircle2, XCircle, Eye, FileText } from 'lucide-react';
import type { User } from '../../App';
import { PackageReview } from './PackageReview';
import { toast } from 'sonner';

interface BoardDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type BoardView = 'dashboard' | 'package-review';

// Mock packages for board review
const MOCK_BOARD_PACKAGES = [
  {
    id: 'PKG-2025-CE-001',
    department: 'Computer Engineering',
    semester: '3rd Semester',
    period: 'Spring 2024-2025',
    receivedDate: '2025-01-18',
    applicantCount: 18,
    status: 'pending_board_review',
    deanNotes: 'All documentation verified. Recommend approval.',
    meetingScheduled: '2025-01-25'
  },
  {
    id: 'PKG-2025-EE-001',
    department: 'Electrical Engineering',
    semester: '3rd Semester',
    period: 'Spring 2024-2025',
    receivedDate: '2025-01-17',
    applicantCount: 12,
    status: 'approved',
    deanNotes: 'Standard processing completed.',
    meetingScheduled: '2025-01-24'
  },
  {
    id: 'PKG-2025-ME-001',
    department: 'Mechanical Engineering',
    semester: '3rd Semester',
    period: 'Spring 2024-2025',
    receivedDate: '2025-01-19',
    applicantCount: 15,
    status: 'pending_board_review',
    deanNotes: 'Two applicants require special consideration.',
    meetingScheduled: '2025-01-25'
  },
  {
    id: 'PKG-2025-IE-001',
    department: 'Industrial Engineering',
    semester: '3rd Semester',
    period: 'Spring 2024-2025',
    receivedDate: '2025-01-16',
    applicantCount: 10,
    status: 'approved',
    deanNotes: 'All eligible candidates meet requirements.',
    meetingScheduled: '2025-01-24'
  }
];

export function BoardDashboard({ user, onLogout, onSwitchRole }: BoardDashboardProps) {
  const [currentView, setCurrentView] = useState<BoardView>('dashboard');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleReviewPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    setCurrentView('package-review');
  };

  if (currentView === 'package-review' && selectedPackage) {
    return (
      <Layout user={user} currentRole="Board" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <PackageReview
          packageId={selectedPackage}
          onBack={() => setCurrentView('dashboard')}
        />
      </Layout>
    );
  }

  const pendingCount = MOCK_BOARD_PACKAGES.filter(p => p.status === 'pending_board_review').length;
  const approvedCount = MOCK_BOARD_PACKAGES.filter(p => p.status === 'approved').length;
  const rejectedCount = MOCK_BOARD_PACKAGES.filter(p => p.status === 'rejected').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_board_review':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending Review</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout user={user} currentRole="Board" onLogout={onLogout} onSwitchRole={onSwitchRole}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Faculty Board Dashboard</h1>
          <p className="text-gray-600">Final Review & Approval of Transfer Packages</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Pending Review</div>
                <div className="text-2xl text-gray-900">{pendingCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Scale className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Approved</div>
                <div className="text-2xl text-gray-900">{approvedCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Rejected</div>
                <div className="text-2xl text-gray-900">{rejectedCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Packages</div>
                <div className="text-2xl text-gray-900">{MOCK_BOARD_PACKAGES.length}</div>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C00000' }}>
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Next Meeting */}
        <Card className="p-6" style={{ backgroundColor: '#C00000' }}>
          <div className="flex items-center justify-between text-white">
            <div>
              <div className="text-sm opacity-90 mb-1">Next Faculty Board Meeting</div>
              <div className="text-2xl">January 25, 2025 - 14:00</div>
            </div>
            <Scale className="w-12 h-12 opacity-90" />
          </div>
        </Card>

        {/* Packages for Review */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">Packages for Board Review</h2>
            <Badge className="bg-gray-100 text-gray-700 border-gray-300">
              Spring 2024-2025
            </Badge>
          </div>

          <div className="space-y-3">
            {MOCK_BOARD_PACKAGES.map(pkg => (
              <div
                key={pkg.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-gray-900">{pkg.department}</h3>
                      {getStatusBadge(pkg.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-2">
                      <div>
                        <div className="text-gray-600">Package ID</div>
                        <div className="text-gray-900">{pkg.id}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Semester</div>
                        <div className="text-gray-900">{pkg.semester}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Applicants</div>
                        <div className="text-gray-900">{pkg.applicantCount}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Meeting Date</div>
                        <div className="text-gray-900">{pkg.meetingScheduled}</div>
                      </div>
                    </div>
                    {pkg.deanNotes && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-2 text-sm">
                        <span className="text-blue-900">Dean's Notes: </span>
                        <span className="text-blue-800">{pkg.deanNotes}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReviewPackage(pkg.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Board Instructions */}
        <Card className="p-6 bg-purple-50 border-purple-200">
          <div className="flex gap-3">
            <Scale className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-purple-900 mb-1">Board Review Process</h3>
              <p className="text-sm text-purple-800">
                Review packages from Dean's Office, examine ranking lists and recommendations,
                discuss special cases in board meetings, and make final approval or rejection decisions.
                Approved packages will be published to students.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
