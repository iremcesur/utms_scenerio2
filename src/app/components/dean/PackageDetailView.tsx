import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { 
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle2,
  FileText,
  Users,
  Download,
  MessageSquare
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { CommentsPanel } from '../shared/CommentsPanel';
import { toast } from 'sonner';

interface PackageDetailViewProps {
  packageId: string;
  onBack: () => void;
}

const MOCK_PACKAGE = {
  id: 'PKG-2025-CE-001',
  department: 'Computer Engineering',
  semester: '3rd Semester',
  period: 'Spring 2024-2025',
  receivedDate: '2025-01-16',
  receivedFrom: 'YGK - Computer Engineering',
  status: 'received_from_ygk',
  summary: {
    totalApplicants: 18,
    eligible: 12,
    asilCount: 8,
    yedekCount: 4,
    quota: 8
  },
  documents: [
    { name: 'Final Ranking List', status: 'complete', size: '245 KB' },
    { name: 'Academic Evaluation Reports', status: 'complete', size: '1.2 MB' },
    { name: 'Course Equivalence Tables', status: 'complete', size: '856 KB' },
    { name: 'Language Verification Summary', status: 'complete', size: '124 KB' },
    { name: 'YGK Commission Notes', status: 'complete', size: '89 KB' }
  ],
  applicants: [
    { rank: 1, name: 'Ahmet Yılmaz', score: 87.5, status: 'asil', intibak: 'complete' },
    { rank: 2, name: 'Ayşe Demir', score: 85.2, status: 'asil', intibak: 'complete' },
    { rank: 3, name: 'Fatma Şahin', score: 83.8, status: 'asil', intibak: 'complete' },
    { rank: 4, name: 'Can Öztürk', score: 82.1, status: 'asil', intibak: 'complete' },
    { rank: 5, name: 'Mustafa Çelik', score: 81.4, status: 'asil', intibak: 'complete' },
    { rank: 6, name: 'Zeynep Kara', score: 80.3, status: 'asil', intibak: 'complete' },
    { rank: 7, name: 'Burak Demir', score: 79.5, status: 'asil', intibak: 'complete' },
    { rank: 8, name: 'Elif Yıldız', score: 78.2, status: 'asil', intibak: 'complete' }
  ]
};

export function PackageDetailView({ packageId, onBack }: PackageDetailViewProps) {
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [clarificationRequest, setClarificationRequest] = useState('');

  const handleForwardToBoard = () => {
    if (adminNotes.trim()) {
      toast.success('Package forwarded to Faculty Board successfully');
      setShowForwardModal(false);
      onBack();
    }
  };

  const handleRequestClarification = () => {
    if (clarificationRequest.trim()) {
      toast.info('Clarification request sent to YGK');
      setShowClarificationModal(false);
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Evaluation Package Review</h1>
          <p className="text-gray-600">{MOCK_PACKAGE.id} - {MOCK_PACKAGE.department}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>
      </div>

      {/* Package Status Banner */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Administrative Review Required:</strong> This package was received from YGK on {MOCK_PACKAGE.receivedDate}. 
          Please review for administrative completeness before forwarding to Faculty Board.
        </AlertDescription>
      </Alert>

      {/* Package Summary */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Package Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Total Applicants</div>
            <div className="text-2xl text-gray-900">{MOCK_PACKAGE.summary.totalApplicants}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Eligible</div>
            <div className="text-2xl text-gray-900">{MOCK_PACKAGE.summary.eligible}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm text-gray-600">Asil (Admitted)</div>
            <div className="text-2xl text-green-600">{MOCK_PACKAGE.summary.asilCount}</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-sm text-gray-600">Yedek (Waitlist)</div>
            <div className="text-2xl text-yellow-600">{MOCK_PACKAGE.summary.yedekCount}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Department</div>
            <div className="text-gray-900">{MOCK_PACKAGE.department}</div>
          </div>
          <div>
            <div className="text-gray-600">Semester Entry</div>
            <div className="text-gray-900">{MOCK_PACKAGE.semester}</div>
          </div>
          <div>
            <div className="text-gray-600">Academic Period</div>
            <div className="text-gray-900">{MOCK_PACKAGE.period}</div>
          </div>
          <div>
            <div className="text-gray-600">Received From</div>
            <div className="text-gray-900">{MOCK_PACKAGE.receivedFrom}</div>
          </div>
          <div>
            <div className="text-gray-600">Received Date</div>
            <div className="text-gray-900">{MOCK_PACKAGE.receivedDate}</div>
          </div>
          <div>
            <div className="text-gray-600">Department Quota</div>
            <div className="text-gray-900">{MOCK_PACKAGE.summary.quota} positions</div>
          </div>
        </div>
      </Card>

      {/* Package Documents */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Package Documents</h2>
        <div className="space-y-3">
          {MOCK_PACKAGE.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-500">Size: {doc.size}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {doc.status}
                </Badge>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Complete Package (ZIP)
          </Button>
        </div>
      </Card>

      {/* Admitted Students Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Admitted Students (Asil List)</h2>
          <Badge className="bg-green-100 text-green-800">
            {MOCK_PACKAGE.applicants.length} Students
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Student Name</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Transfer Score</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">İntibak</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PACKAGE.applicants.map((student) => (
                <tr key={student.rank} className="border-b border-gray-100 bg-green-50">
                  <td className="py-3 px-4 text-sm">{student.rank}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{student.name}</td>
                  <td className="py-3 px-4 text-sm">{student.score}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 text-xs">Asil</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comments Panel */}
      <CommentsPanel 
        applicationId={packageId}
        currentUserRole="Dean's Office"
      />

      {/* Action Buttons */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Administrative Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="h-auto py-4 flex flex-col items-center space-y-2"
            onClick={() => setShowClarificationModal(true)}
          >
            <MessageSquare className="w-6 h-6" />
            <div>
              <div className="text-sm">Request Clarification</div>
              <div className="text-xs text-gray-500">Send back to YGK for additional info</div>
            </div>
          </Button>

          <Button 
            className="h-auto py-4 flex flex-col items-center space-y-2"
            style={{ backgroundColor: '#6B1313' }}
            onClick={() => setShowForwardModal(true)}
          >
            <Send className="w-6 h-6" />
            <div>
              <div className="text-sm">Forward to Faculty Board</div>
              <div className="text-xs opacity-80">Approve administrative completeness</div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Forward to Board Modal */}
      <Dialog open={showForwardModal} onOpenChange={setShowForwardModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Forward Package to Faculty Board</DialogTitle>
            <DialogDescription>
              This action will send the evaluation package to the Faculty Board for final approval.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Administrative review complete. All required documents are present and the evaluation appears complete.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="adminNotes">Dean's Office Notes for Faculty Board *</Label>
              <Textarea
                id="adminNotes"
                rows={4}
                placeholder="Provide administrative notes or recommendations for the Faculty Board..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                These notes will be visible to Faculty Board members during their review.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-gray-900 mb-2">Faculty Board will be notified:</div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ Email notification to all Faculty Board members</li>
                <li>✓ Package will appear in their pending queue</li>
                <li>✓ All attached documents will be accessible</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowForwardModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleForwardToBoard}
                disabled={!adminNotes.trim()}
                style={{ backgroundColor: '#6B1313' }}
              >
                <Send className="w-4 h-4 mr-2" />
                Forward to Board
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Clarification Modal */}
      <Dialog open={showClarificationModal} onOpenChange={setShowClarificationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Clarification from YGK</DialogTitle>
            <DialogDescription>
              Send this package back to YGK with specific questions or requests for additional information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clarification">Clarification Request *</Label>
              <Textarea
                id="clarification"
                rows={5}
                placeholder="Specify what information or clarification is needed from YGK..."
                value={clarificationRequest}
                onChange={(e) => setClarificationRequest(e.target.value)}
              />
            </div>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This action will return the package to YGK and delay the Faculty Board review process.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowClarificationModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleRequestClarification}
                disabled={!clarificationRequest.trim()}
                variant="outline"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Clarification Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}