import { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Upload, 
  Eye, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import type { User } from '../../App';
import { ApplicationForm } from './ApplicationForm';
import { DocumentUpload } from './DocumentUpload';
import { ApplicationTimeline } from './ApplicationTimeline';
import { FinalResult } from './FinalResult';
import { AppealForm } from './AppealForm';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type StudentView = 
  | 'dashboard'
  | 'new-application'
  | 'upload-documents'
  | 'fix-application'
  | 'view-timeline'
  | 'view-result'
  | 'submit-appeal';

export function StudentDashboard({ user, onLogout, onSwitchRole }: StudentDashboardProps) {
  const [currentView, setCurrentView] = useState<StudentView>('dashboard');
  const [applicationData, setApplicationData] = useState<any>(null);

  // Mock application status
  const hasActiveApplication = true;
  const applicationStatus = 'under_review'; // draft, submitted, under_review, returned, completed
  const applicationId = 'APP-2025-001234';

  const handleFormSave = (data: any) => {
    setApplicationData(data);
    setCurrentView('upload-documents');
  };

  if (currentView === 'new-application') {
    return (
      <Layout user={user} currentRole="Student" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <ApplicationForm 
          onSave={handleFormSave}
          onCancel={() => setCurrentView('dashboard')}
        />
      </Layout>
    );
  }

  if (currentView === 'upload-documents') {
    return (
      <Layout user={user} currentRole="Student" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <DocumentUpload 
          applicationId={applicationId}
          applicationData={applicationData}
          onComplete={() => setCurrentView('view-timeline')}
          onBack={() => setCurrentView('new-application')}
        />
      </Layout>
    );
  }

  if (currentView === 'view-timeline') {
    return (
      <Layout user={user} currentRole="Student" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <ApplicationTimeline 
          applicationId={applicationId}
          onBack={() => setCurrentView('dashboard')}
        />
      </Layout>
    );
  }

  if (currentView === 'view-result') {
    return (
      <Layout user={user} currentRole="Student" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <FinalResult 
          applicationId={applicationId}
          onAppeal={() => setCurrentView('submit-appeal')}
          onBack={() => setCurrentView('dashboard')}
        />
      </Layout>
    );
  }

  if (currentView === 'submit-appeal') {
    return (
      <Layout user={user} currentRole="Student" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <AppealForm 
          applicationId={applicationId}
          onSubmit={() => setCurrentView('dashboard')}
          onCancel={() => setCurrentView('view-result')}
        />
      </Layout>
    );
  }

  // Dashboard View
  return (
    <Layout user={user} currentRole="Student" onLogout={onLogout} onSwitchRole={onSwitchRole}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-gray-900 mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your transfer applications</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C00000' }}>
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-gray-900">1</div>
                <div className="text-sm text-gray-600">Active Application</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl text-gray-900">Under Review</div>
                <div className="text-sm text-gray-600">Current Status</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl text-gray-900">2</div>
                <div className="text-sm text-gray-600">Notifications</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Application Summary */}
        {hasActiveApplication && (
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-gray-900 mb-1">Application #{applicationId}</h2>
                <p className="text-sm text-gray-600">Computer Engineering - 3rd Semester Entry</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
            </div>

            {/* Mini Timeline */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Submitted</span>
              </div>
              <div className="flex-1 h-px bg-green-600"></div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">ÖİDB Review</span>
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-600">YDYO Review</span>
              </div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                <span className="text-sm text-gray-400">YGK Review</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline"
                onClick={() => setCurrentView('view-timeline')}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Full Timeline
              </Button>
            </div>
          </Card>
        )}

        {/* Notifications */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Recent Notifications</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900">Language evaluation in progress</div>
                <div className="text-xs text-gray-600 mt-1">Your application is being reviewed by YDYO - 2 hours ago</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900">Initial verification completed</div>
                <div className="text-xs text-gray-600 mt-1">ÖİDB has verified your documents - 1 day ago</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => setCurrentView('new-application')}
              disabled={hasActiveApplication}
            >
              <Plus className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="text-sm">Create New Application</div>
                <div className="text-xs text-gray-500 mt-1">Start a new transfer application</div>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-4 justify-start"
              onClick={() => setCurrentView('view-result')}
            >
              <Eye className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="text-sm">View Results</div>
                <div className="text-xs text-gray-500 mt-1">Check your application outcome</div>
              </div>
            </Button>
          </div>
        </Card>

        {/* Application Period Info */}
        <Card className="p-6 border-l-4" style={{ borderLeftColor: '#C00000' }}>
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#C00000' }} />
            <div>
              <div className="text-sm text-gray-900 mb-1">2024-2025 Spring Transfer Application Period</div>
              <div className="text-xs text-gray-600">
                Application Deadline: January 15, 2025<br />
                Results Announcement: February 1, 2025
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
