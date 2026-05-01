import { useState } from 'react';
import { AppShell } from '../AppShell';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  FileText, 
  Eye, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import type { User } from '../../App';
import { ApplicationForm } from './ApplicationForm';
import { DocumentUpload } from './DocumentUpload';
import { ApplicationTimeline } from './ApplicationTimeline';
import { FinalResult } from './FinalResult';
import { AppealForm } from './AppealForm';

interface EnhancedStudentDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type StudentView = 
  | 'dashboard'
  | 'new-application'
  | 'upload-documents'
  | 'view-timeline'
  | 'view-result'
  | 'submit-appeal';

type Section = 'dashboard' | 'applications' | 'track' | 'settings';

// Mock applications data
const MOCK_APPLICATIONS = [
  {
    id: 'APP-2025-001234',
    targetProgram: 'Computer Engineering',
    targetFaculty: 'Engineering Faculty',
    targetSemester: '3rd Semester',
    submittedDate: '2025-01-10',
    lastUpdated: '2025-01-12',
    status: 'under_review',
    currentStage: 'YDYO Language Review',
    progress: 40
  },
  {
    id: 'APP-2024-009876',
    targetProgram: 'Electrical Engineering',
    targetFaculty: 'Engineering Faculty',
    targetSemester: '5th Semester',
    submittedDate: '2024-09-15',
    lastUpdated: '2024-10-01',
    status: 'final_accepted',
    currentStage: 'Completed',
    progress: 100
  }
];

export function EnhancedStudentDashboard({ user, onLogout, onSwitchRole }: EnhancedStudentDashboardProps) {
  const [currentSection, setCurrentSection] = useState<Section>('dashboard');
  const [currentView, setCurrentView] = useState<StudentView>('dashboard');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);

  const handleFormSave = (data: any) => {
    setApplicationData(data);
    setCurrentView('upload-documents');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft':
        return { label: 'Draft', className: 'bg-gray-100 text-gray-800' };
      case 'pending_upload':
        return { label: 'Pending Document Upload', className: 'bg-blue-100 text-blue-800' };
      case 'under_review':
        return { label: 'Under Review', className: 'bg-yellow-100 text-yellow-800' };
      case 'returned':
        return { label: 'Returned for Correction', className: 'bg-red-100 text-red-800' };
      case 'final_accepted':
        return { label: 'Final Accepted', className: 'bg-green-100 text-green-800' };
      case 'final_rejected':
        return { label: 'Final Rejected', className: 'bg-red-100 text-red-800' };
      case 'appeal_submitted':
        return { label: 'Appeal Submitted', className: 'bg-purple-100 text-purple-800' };
      default:
        return { label: status, className: 'bg-gray-100 text-gray-800' };
    }
  };

  const renderDashboardContent = () => {
    if (currentView === 'new-application') {
      return (
        <ApplicationForm 
          onSave={handleFormSave}
          onCancel={() => setCurrentView('dashboard')}
        />
      );
    }

    if (currentView === 'upload-documents') {
      return (
        <DocumentUpload 
          applicationId="APP-2025-NEW"
          applicationData={applicationData}
          onComplete={() => setCurrentView('dashboard')}
          onBack={() => setCurrentView('new-application')}
        />
      );
    }

    if (currentView === 'view-timeline' && selectedAppId) {
      return (
        <ApplicationTimeline 
          applicationId={selectedAppId}
          onBack={() => {
            setCurrentView('dashboard');
            setSelectedAppId(null);
          }}
        />
      );
    }

    if (currentView === 'view-result' && selectedAppId) {
      return (
        <FinalResult 
          applicationId={selectedAppId}
          onAppeal={() => setCurrentView('submit-appeal')}
          onBack={() => {
            setCurrentView('dashboard');
            setSelectedAppId(null);
          }}
        />
      );
    }

    if (currentView === 'submit-appeal' && selectedAppId) {
      return (
        <AppealForm 
          applicationId={selectedAppId}
          onSubmit={() => setCurrentView('dashboard')}
          onCancel={() => setCurrentView('view-result')}
        />
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">My Transfer Applications</h1>
            <p className="text-gray-600">View and manage your transfer applications</p>
          </div>
          <Button 
            style={{ backgroundColor: '#C00000' }}
            onClick={() => setCurrentView('new-application')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Application
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Under Review</div>
                <div className="text-2xl text-gray-900">
                  {MOCK_APPLICATIONS.filter(a => a.status === 'under_review').length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Accepted</div>
                <div className="text-2xl text-gray-900">
                  {MOCK_APPLICATIONS.filter(a => a.status === 'final_accepted').length}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Needs Action</div>
                <div className="text-2xl text-gray-900">0</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search applications by ID or program..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Applications Table */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">All Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Application ID</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Target Program</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Semester</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Current Stage</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Last Updated</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_APPLICATIONS.map((app) => {
                  const statusConfig = getStatusConfig(app.status);
                  return (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{app.id}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-900">{app.targetProgram}</div>
                        <div className="text-xs text-gray-500">{app.targetFaculty}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{app.targetSemester}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{app.currentStage}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{app.lastUpdated}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedAppId(app.id);
                              setCurrentView('view-timeline');
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Track
                          </Button>
                          {app.status === 'final_accepted' || app.status === 'final_rejected' ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedAppId(app.id);
                                setCurrentView('view-result');
                              }}
                            >
                              View Result
                            </Button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <AppShell
      user={user}
      currentRole="Student"
      onLogout={onLogout}
      onSwitchRole={onSwitchRole}
      currentSection={currentSection}
      onNavigate={(section) => {
        setCurrentSection(section as Section);
        setCurrentView('dashboard');
      }}
    >
      {renderDashboardContent()}
    </AppShell>
  );
}
