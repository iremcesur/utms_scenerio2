import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Eye,
  Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface IntakeVerificationProps {
  applicationId: string;
  onBack: () => void;
}

export function IntakeVerification({ applicationId, onBack }: IntakeVerificationProps) {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [returnReasons, setReturnReasons] = useState<string[]>([]);
  const [officerComment, setOfficerComment] = useState('');

  // Mock application data
  const appData = {
    id: applicationId,
    student: {
      name: 'Ahmet Yılmaz',
      tckn: '12345678901',
      studentId: '2021234567',
      email: 'ahmet.yilmaz@student.edu.tr'
    },
    application: {
      targetProgram: 'Computer Engineering',
      targetSemester: '3',
      gpa: '3.45',
      osymScore: '485.5',
      osymYear: '2024',
      currentUniversity: 'Istanbul Technical University',
      currentProgram: 'Industrial Engineering'
    },
    documents: [
      { id: 'transcript', name: 'Official Transcript', status: 'verified', size: '2.4 MB' },
      { id: 'osym', name: 'ÖSYM Result', status: 'verified', size: '1.8 MB' },
      { id: 'curriculum', name: 'Curriculum', status: 'verified', size: '3.2 MB' },
      { id: 'certificate', name: 'Student Certificate', status: 'verified', size: '1.2 MB' },
      { id: 'language', name: 'Language Proficiency', status: 'manual_check', size: '2.1 MB' },
      { id: 'course_contents', name: 'Course Contents', status: 'verified', size: '5.6 MB' }
    ],
    submittedDate: '2025-01-10 14:30'
  };

  const returnReasonOptions = [
    'Incomplete transcript',
    'Invalid ÖSYM document',
    'Missing required signatures',
    'Incorrect curriculum version',
    'Low quality document scan',
    'GPA below minimum requirement',
    'Invalid student certificate',
    'Missing course syllabi'
  ];

  const handleVerify = () => {
    setShowVerifyModal(true);
  };

  const handleReturn = () => {
    if (returnReasons.length > 0) {
      // Process return
      setShowReturnModal(false);
      onBack();
    }
  };

  const handleReject = () => {
    if (officerComment.trim()) {
      // Process rejection
      setShowRejectModal(false);
      onBack();
    }
  };

  const toggleReturnReason = (reason: string) => {
    if (returnReasons.includes(reason)) {
      setReturnReasons(returnReasons.filter(r => r !== reason));
    } else {
      setReturnReasons([...returnReasons, reason]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Application Intake Verification</h1>
          <p className="text-gray-600">Application ID: {applicationId}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Queue
        </Button>
      </div>

      {/* Student Information */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Student Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Full Name</div>
            <div className="text-gray-900">{appData.student.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">T.C. Identity Number</div>
            <div className="text-gray-900">{appData.student.tckn}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Student ID</div>
            <div className="text-gray-900">{appData.student.studentId}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Email</div>
            <div className="text-gray-900">{appData.student.email}</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Data */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Application Data</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">Target Program</div>
              <div className="text-gray-900">{appData.application.targetProgram}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">Target Semester</div>
              <div className="text-gray-900">{appData.application.targetSemester}rd Semester</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">Current GPA</div>
              <div className="text-gray-900">{appData.application.gpa} / 4.00</div>
              {parseFloat(appData.application.gpa) >= 2.50 && (
                <div className="text-xs text-green-600 mt-1">✓ Meets minimum requirement</div>
              )}
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">ÖSYM Score</div>
              <div className="text-gray-900">{appData.application.osymScore} ({appData.application.osymYear})</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">Current University</div>
              <div className="text-gray-900">{appData.application.currentUniversity}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-600">Current Program</div>
              <div className="text-gray-900">{appData.application.currentProgram}</div>
            </div>
          </div>
        </Card>

        {/* Documents Verification */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Documents Verification</h2>
          <div className="space-y-3">
            {appData.documents.map((doc) => (
              <div key={doc.id} className="p-3 bg-gray-50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <div className="text-sm text-gray-900">{doc.name}</div>
                  </div>
                  {doc.status === 'verified' && (
                    <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>
                  )}
                  {doc.status === 'manual_check' && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Manual Check</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Size: {doc.size}</div>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
                {doc.status === 'manual_check' && (
                  <Alert className="mt-2">
                    <AlertTriangle className="h-3 w-3" />
                    <AlertDescription className="text-xs">
                      This document requires manual verification
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Document Authenticity Check */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Document Authenticity Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="text-sm text-gray-900">Identity Verification</div>
            </div>
            <div className="text-xs text-gray-600">TCKN validated via e-Government</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="text-sm text-gray-900">ÖSYM Data</div>
            </div>
            <div className="text-xs text-gray-600">Score verified with ÖSYM database</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div className="text-sm text-gray-900">Language Certificate</div>
            </div>
            <div className="text-xs text-gray-600">Requires YDYO verification</div>
          </div>
        </div>
      </Card>

      {/* Decision Actions */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Verification Decision</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            className="h-auto py-4 flex flex-col items-center space-y-2"
            style={{ backgroundColor: '#C00000' }}
            onClick={handleVerify}
          >
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <div className="text-sm">Mark as Verified</div>
              <div className="text-xs opacity-80">All documents authentic</div>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
            onClick={() => setShowReturnModal(true)}
          >
            <Send className="w-6 h-6" />
            <div>
              <div className="text-sm">Return for Correction</div>
              <div className="text-xs text-gray-500">Request document fixes</div>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2 border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => setShowRejectModal(true)}
          >
            <XCircle className="w-6 h-6" />
            <div>
              <div className="text-sm">Reject Application</div>
              <div className="text-xs">Permanently reject</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Verify Modal */}
      <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Application?</DialogTitle>
            <DialogDescription>
              Confirming verification will forward this application to the next step in the workflow.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Application will be forwarded to YDYO for language proficiency review.
              </AlertDescription>
            </Alert>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowVerifyModal(false)}>
                Cancel
              </Button>
              <Button 
                style={{ backgroundColor: '#C00000' }}
                onClick={() => {
                  setShowVerifyModal(false);
                  onBack();
                }}
              >
                Confirm Verification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Return for Correction Modal */}
      <Dialog open={showReturnModal} onOpenChange={setShowReturnModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Return Application for Correction</DialogTitle>
            <DialogDescription>
              Select the issues that need to be corrected. The student will be notified to fix these items.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              {returnReasonOptions.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <Checkbox
                    id={reason}
                    checked={returnReasons.includes(reason)}
                    onCheckedChange={() => toggleReturnReason(reason)}
                  />
                  <Label htmlFor={reason} className="text-sm cursor-pointer">
                    {reason}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Additional Comments (Optional)</Label>
              <Textarea
                id="comment"
                rows={3}
                placeholder="Provide additional details for the student..."
                value={officerComment}
                onChange={(e) => setOfficerComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowReturnModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleReturn}
                disabled={returnReasons.length === 0}
                style={{ backgroundColor: '#C00000' }}
              >
                Send Back for Correction
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application?</DialogTitle>
            <DialogDescription>
              This action will permanently reject the application. Please provide a reason.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">Rejection Reason *</Label>
              <Textarea
                id="rejectReason"
                rows={4}
                placeholder="Provide detailed reason for rejection..."
                value={officerComment}
                onChange={(e) => setOfficerComment(e.target.value)}
              />
            </div>

            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                This action cannot be undone. The student will be notified of the rejection.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleReject}
                disabled={!officerComment.trim()}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
