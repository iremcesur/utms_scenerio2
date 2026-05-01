import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ArrowLeft, CheckCircle2, XCircle, Eye, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';

interface ReviewAppealsProps {
  onBack: () => void;
}

const MOCK_APPEALS = [
  {
    id: 'APPEAL-2025-001',
    applicationId: 'APP-2025-001240',
    studentName: 'Can Öztürk',
    program: 'Electrical Engineering',
    originalDecision: 'Rejected',
    appealDate: '2025-02-03',
    appealReason: 'I believe there was an error in the GPA calculation. My official transcript shows a GPA of 2.85, which meets the minimum requirement of 2.50. However, my application was rejected citing insufficient GPA. I have attached an updated official transcript for verification.',
    status: 'pending',
    supportingDoc: true
  },
  {
    id: 'APPEAL-2025-002',
    applicationId: 'APP-2025-001245',
    studentName: 'Elif Yıldız',
    program: 'Computer Engineering',
    originalDecision: 'Rejected',
    appealDate: '2025-02-04',
    appealReason: 'My TOEFL certificate was not considered in the evaluation. I submitted a valid TOEFL iBT score of 88, which should exempt me from the language proficiency test. The rejection letter states language requirements were not met, but I believe this is an oversight.',
    status: 'pending',
    supportingDoc: true
  },
  {
    id: 'APPEAL-2025-003',
    applicationId: 'APP-2025-001238',
    studentName: 'Burak Demir',
    program: 'Mechanical Engineering',
    originalDecision: 'Waitlisted',
    appealDate: '2025-02-02',
    appealReason: 'I was placed on the waitlist, but I believe my course equivalences were not properly evaluated. Several of my completed courses align directly with the curriculum requirements and should have resulted in a higher ranking score.',
    status: 'approved',
    supportingDoc: false,
    reviewNote: 'Appeal approved. Course equivalences re-evaluated. Student moved to admitted list.'
  }
];

export function ReviewAppeals({ onBack }: ReviewAppealsProps) {
  const [selectedAppeal, setSelectedAppeal] = useState<typeof MOCK_APPEALS[0] | null>(null);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [reviewNote, setReviewNote] = useState('');

  const handleDecision = (appealId: string, dec: 'approve' | 'reject') => {
    const appeal = MOCK_APPEALS.find(a => a.id === appealId);
    if (appeal) {
      setSelectedAppeal(appeal);
      setDecision(dec);
      setShowDecisionModal(true);
    }
  };

  const submitDecision = () => {
    if (reviewNote.trim()) {
      setShowDecisionModal(false);
      setSelectedAppeal(null);
      setDecision(null);
      setReviewNote('');
    }
  };

  const pendingAppeals = MOCK_APPEALS.filter(a => a.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Review Appeals</h1>
          <p className="text-gray-600">{pendingAppeals.length} appeals pending review</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Appeals List */}
      <div className="space-y-4">
        {MOCK_APPEALS.map((appeal) => (
          <Card key={appeal.id} className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-gray-900">{appeal.studentName}</h3>
                    {appeal.status === 'pending' && (
                      <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                    )}
                    {appeal.status === 'approved' && (
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    )}
                    {appeal.status === 'rejected' && (
                      <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Appeal ID</div>
                      <div className="text-gray-900">{appeal.id}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Application ID</div>
                      <div className="text-gray-900">{appeal.applicationId}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Program</div>
                      <div className="text-gray-900">{appeal.program}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Original Decision</div>
                      <div className="text-red-600">{appeal.originalDecision}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Appeal Date</div>
                      <div className="text-gray-900">{appeal.appealDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Supporting Docs</div>
                      <div className="text-gray-900">{appeal.supportingDoc ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appeal Reason */}
              <div>
                <div className="text-sm text-gray-600 mb-2">Appeal Reason:</div>
                <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-900">
                  {appeal.appealReason}
                </div>
              </div>

              {/* Supporting Document */}
              {appeal.supportingDoc && (
                <div>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Supporting Document
                  </Button>
                </div>
              )}

              {/* Review Note (if reviewed) */}
              {appeal.status !== 'pending' && appeal.reviewNote && (
                <div>
                  <div className="text-sm text-gray-600 mb-2">Review Note:</div>
                  <div className="p-4 bg-blue-50 rounded-lg text-sm text-gray-900 border border-blue-200">
                    {appeal.reviewNote}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {appeal.status === 'pending' && (
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <Button 
                    size="sm"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Original Application
                  </Button>
                  <div className="flex-1"></div>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => handleDecision(appeal.id, 'reject')}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Appeal
                  </Button>
                  <Button 
                    size="sm"
                    style={{ backgroundColor: '#C00000' }}
                    onClick={() => handleDecision(appeal.id, 'approve')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Approve Appeal
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Decision Modal */}
      <Dialog open={showDecisionModal} onOpenChange={setShowDecisionModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {decision === 'approve' ? 'Approve Appeal' : 'Reject Appeal'}
            </DialogTitle>
            <DialogDescription>
              {selectedAppeal && (
                <>Appeal ID: {selectedAppeal.id} - {selectedAppeal.studentName}</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedAppeal && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Appeal Reason:</div>
                <div className="text-sm text-gray-900">{selectedAppeal.appealReason}</div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reviewNote">
                Review Decision Note *
              </Label>
              <Textarea
                id="reviewNote"
                rows={5}
                placeholder={
                  decision === 'approve' 
                    ? "Explain why the appeal is approved and any corrective actions taken..."
                    : "Explain why the appeal is rejected and the reasoning behind the original decision..."
                }
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                This note will be shared with the student and included in the appeal record.
              </p>
            </div>

            {decision === 'approve' && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Approving this appeal will revert the original decision. The application will be re-evaluated or the student will be admitted.
                </AlertDescription>
              </Alert>
            )}

            {decision === 'reject' && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Rejecting this appeal will uphold the original decision. This is final and cannot be appealed again.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowDecisionModal(false);
                  setReviewNote('');
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={submitDecision}
                disabled={!reviewNote.trim()}
                style={decision === 'approve' ? { backgroundColor: '#C00000' } : undefined}
                variant={decision === 'reject' ? 'destructive' : 'default'}
              >
                {decision === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
