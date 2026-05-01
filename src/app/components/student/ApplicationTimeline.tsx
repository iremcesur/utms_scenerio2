import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  Circle,
  ArrowLeft,
  FileText,
  Eye
} from 'lucide-react';

interface ApplicationTimelineProps {
  applicationId: string;
  onBack: () => void;
}

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  actor?: string;
  notes?: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 'submitted',
    title: 'Application Submitted',
    description: 'You successfully submitted your transfer application',
    status: 'completed',
    timestamp: '2025-01-10 14:30',
    actor: 'Ahmet Yılmaz (Student)'
  },
  {
    id: 'oidb_intake',
    title: 'ÖİDB Initial Verification',
    description: 'Student Affairs Office is verifying your documents',
    status: 'completed',
    timestamp: '2025-01-11 09:15',
    actor: 'Mehmet Demir (ÖİDB)',
    notes: 'All documents verified. Application forwarded to YDYO.'
  },
  {
    id: 'ydyo_review',
    title: 'YDYO Language Review',
    description: 'Foreign Languages Office is reviewing your language proficiency',
    status: 'active',
    timestamp: '2025-01-12 10:00',
    actor: 'Ayşe Kaya (YDYO)',
    notes: 'Language document under evaluation.'
  },
  {
    id: 'ygk_academic',
    title: 'YGK Academic Evaluation',
    description: 'Transfer Commission will evaluate your academic eligibility',
    status: 'pending'
  },
  {
    id: 'ygk_ranking',
    title: 'YGK Ranking',
    description: 'You will be ranked against other applicants',
    status: 'pending'
  },
  {
    id: 'ygk_intibak',
    title: 'Course Equivalence (İntibak)',
    description: 'Course equivalence table will be prepared',
    status: 'pending'
  },
  {
    id: 'dean_review',
    title: "Dean's Office Review",
    description: "Dean's office will review the evaluation package",
    status: 'pending'
  },
  {
    id: 'board_approval',
    title: 'Faculty Board Approval',
    description: 'Final approval from Faculty Board',
    status: 'pending'
  },
  {
    id: 'results_published',
    title: 'Results Published',
    description: 'Final results will be announced',
    status: 'pending'
  }
];

export function ApplicationTimeline({ applicationId, onBack }: ApplicationTimelineProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Application Status Timeline</h1>
          <p className="text-gray-600">Application ID: {applicationId}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Current Status Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1">Current Status</div>
            <h2 className="text-gray-900">YDYO Language Review</h2>
            <p className="text-sm text-gray-600 mt-1">Your language proficiency documents are being evaluated</p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-6">Application Progress</h2>
        
        <div className="space-y-6">
          {TIMELINE_STEPS.map((step, index) => {
            const isLast = index === TIMELINE_STEPS.length - 1;
            
            return (
              <div key={step.id} className="flex">
                {/* Icon and Line */}
                <div className="flex flex-col items-center mr-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {step.status === 'completed' && (
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                    )}
                    {step.status === 'active' && (
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-yellow-600" />
                      </div>
                    )}
                    {step.status === 'pending' && (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Circle className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Connecting Line */}
                  {!isLast && (
                    <div className={`w-0.5 h-full mt-2 ${
                      step.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                    }`} style={{ minHeight: '40px' }}></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`${
                        step.status === 'pending' ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        step.status === 'pending' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    {step.status !== 'pending' && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{step.timestamp}</div>
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  {step.actor && (
                    <div className="text-xs text-gray-500 mt-2">
                      <span className="text-gray-600">Handled by:</span> {step.actor}
                    </div>
                  )}

                  {step.notes && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-900">{step.notes}</div>
                    </div>
                  )}

                  {step.status === 'active' && (
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-600 animate-pulse"></div>
                        <span className="text-xs text-yellow-700">Currently processing</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Application Details */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Application Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Target Program</div>
            <div className="text-gray-900">Computer Engineering</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Target Semester</div>
            <div className="text-gray-900">3rd Semester (2nd Year Entry)</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Current GPA</div>
            <div className="text-gray-900">3.45 / 4.00</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">ÖSYM Score</div>
            <div className="text-gray-900">485.5 (2024)</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Submission Date</div>
            <div className="text-gray-900">January 10, 2025</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Expected Result Date</div>
            <div className="text-gray-900">February 1, 2025</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            View Application Documents
          </Button>
        </div>
      </Card>
    </div>
  );
}
