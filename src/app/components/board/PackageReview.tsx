import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Download,
  FileText,
  AlertTriangle,
  Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { CommentsPanel } from '../shared/CommentsPanel';
import { toast } from 'sonner';

interface PackageReviewProps {
  packageId: string;
  onBack: () => void;
}

const MOCK_PACKAGE = {
  id: 'PKG-2025-CE-001',
  department: 'Computer Engineering',
  semester: '3rd Semester',
  receivedDate: '2025-01-18',
  meetingDate: '2025-01-25',
  deansNotes: 'Administrative review complete. All documentation is in order. YGK evaluation appears thorough and well-documented. Recommend approval.',
  summary: {
    asilCount: 8,
    yedekCount: 4,
    quota: 8
  }
};

export function PackageReview({ packageId, onBack }: PackageReviewProps) {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [boardNotes, setBoardNotes] = useState('');
  const [confirmedReview, setConfirmedReview] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = () => {
    if (boardNotes.trim() && confirmedReview) {
      toast.success('Package approved successfully. Results will be published within 24 hours.');
      setShowApproveModal(false);
      onBack();
    }
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      toast.error('Package rejected and returned for revision');
      setShowRejectModal(false);
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Faculty Board - Package Review</h1>
          <p className="text-gray-600">{MOCK_PACKAGE.id} - {MOCK_PACKAGE.department}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>
      </div>

      {/* Meeting Info Banner */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Faculty Board Meeting:</strong> This package is scheduled for review at the board meeting on {MOCK_PACKAGE.meetingDate}. 
          All board members are required to review before the meeting.
        </AlertDescription>
      </Alert>

      {/* Package Overview */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Package Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Department</div>
            <div className="text-gray-900">{MOCK_PACKAGE.department}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Semester Entry</div>
            <div className="text-gray-900">{MOCK_PACKAGE.semester}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600">Asil Quota</div>
            <div className="text-2xl text-green-600">{MOCK_PACKAGE.summary.asilCount}</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-sm text-gray-600">Yedek</div>
            <div className="text-2xl text-yellow-600">{MOCK_PACKAGE.summary.yedekCount}</div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Dean's Office Notes:</div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-gray-900">
            {MOCK_PACKAGE.deansNotes}
          </div>
        </div>
      </Card>

      {/* Review Checklist */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Board Review Checklist</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">YGK Evaluation Complete</div>
                <div className="text-xs text-gray-600">All applicants evaluated, scored, and ranked according to established criteria</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Course Equivalence (İntibak) Tables</div>
                <div className="text-xs text-gray-600">İntibak prepared for all admitted students</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Quota Compliance</div>
                <div className="text-xs text-gray-600">Recommendations comply with approved department quotas</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Dean's Administrative Review</div>
                <div className="text-xs text-gray-600">Dean's office has verified administrative completeness</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">Language Proficiency Verification</div>
                <div className="text-xs text-gray-600">YDYO has completed language review for all applicants</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Package Documents */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Review Documents</h2>
        <div className="space-y-2">
          {[
            'Final Ranking List (Asil & Yedek)',
            'YGK Evaluation Reports',
            'Course Equivalence Tables (İntibak)',
            'Language Verification Summary',
            "Dean's Review Notes",
            'Supporting Documentation'
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">{doc}</span>
              </div>
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Comments Panel */}
      <CommentsPanel 
        applicationId={packageId}
        currentUserRole="Faculty Board"
      />

      {/* Board Decision Actions */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Board Decision</h2>
        <p className="text-sm text-gray-600 mb-6">
          The Faculty Board must approve or reject this evaluation package. Approval will finalize the transfer decisions 
          for publication to students. Rejection will return the package for revision.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2 border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => setShowRejectModal(true)}
          >
            <XCircle className="w-6 h-6" />
            <div>
              <div className="text-sm">Reject Package</div>
              <div className="text-xs">Return for revision</div>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
          >
            <Send className="w-6 h-6" />
            <div>
              <div className="text-sm">Request Clarification</div>
              <div className="text-xs">Send back to Dean/YGK</div>
            </div>
          </Button>

          <Button 
            className="h-auto py-4 flex flex-col items-center space-y-2"
            style={{ backgroundColor: '#5C1010' }}
            onClick={() => setShowApproveModal(true)}
          >
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <div className="text-sm">Approve Package</div>
              <div className="text-xs opacity-80">Finalize decisions</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Approve Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Approve Evaluation Package</DialogTitle>
            <DialogDescription>
              Faculty Board approval will finalize all transfer decisions in this package.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Impact of Approval:</strong>
                <ul className="list-disc list-inside mt-2 text-sm">
                  <li>{MOCK_PACKAGE.summary.asilCount} students will be admitted</li>
                  <li>{MOCK_PACKAGE.summary.yedekCount} students will be placed on waitlist</li>
                  <li>Results will be published to students within 24 hours</li>
                  <li>ÖİDB will be notified to proceed with publication</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="boardNotes">Board Decision Notes *</Label>
              <Textarea
                id="boardNotes"
                rows={4}
                placeholder="Enter Faculty Board's official notes and decision rationale..."
                value={boardNotes}
                onChange={(e) => setBoardNotes(e.target.value)}
              />
            </div>

            <div className="flex items-start space-x-2 p-4 bg-gray-50 rounded-lg">
              <Checkbox 
                id="confirm"
                checked={confirmedReview}
                onCheckedChange={(checked) => setConfirmedReview(checked as boolean)}
              />
              <Label htmlFor="confirm" className="text-sm cursor-pointer">
                I confirm that I have reviewed all documents and the Faculty Board approves this evaluation package 
                for final publication. This decision is binding and will be recorded in the official board minutes.
              </Label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowApproveModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleApprove}
                disabled={!boardNotes.trim() || !confirmedReview}
                style={{ backgroundColor: '#5C1010' }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirm Approval
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reject Evaluation Package</DialogTitle>
            <DialogDescription>
              This action will return the package for revision. Please provide detailed reasons.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Rejecting this package will delay the final results publication. The package will be returned 
                to the Dean's Office and YGK for revision based on your feedback.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="rejection">Rejection Reason and Required Revisions *</Label>
              <Textarea
                id="rejection"
                rows={6}
                placeholder="Clearly specify what issues were identified and what revisions are required..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}