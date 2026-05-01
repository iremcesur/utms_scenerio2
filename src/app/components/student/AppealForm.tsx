import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Upload, X, Send, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

interface AppealFormProps {
  applicationId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

export function AppealForm({ applicationId, onSubmit, onCancel }: AppealFormProps) {
  const [appealReason, setAppealReason] = useState('');
  const [supportingDoc, setSupportingDoc] = useState<File | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 10) {
      setErrors({ ...errors, file: 'File size must not exceed 10MB' });
      return;
    }

    const fileExt = file.name.split('.').pop()?.toUpperCase();
    if (!fileExt || !['PDF', 'JPG', 'PNG', 'DOC', 'DOCX'].includes(fileExt)) {
      setErrors({ ...errors, file: 'Only PDF, JPG, PNG, DOC, DOCX files are allowed' });
      return;
    }

    setSupportingDoc(file);
    setErrors({ ...errors, file: '' });
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!appealReason.trim()) {
      newErrors.reason = 'Please provide a reason for your appeal';
    } else if (appealReason.length < 50) {
      newErrors.reason = 'Appeal reason must be at least 50 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Submit Appeal</h1>
          <p className="text-gray-600">Application ID: {applicationId}</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>
      </div>

      {/* Important Information */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Appeal Guidelines:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Appeals must be submitted within 5 business days of result announcement</li>
            <li>Clearly state the reason for your appeal and any errors you believe occurred</li>
            <li>Provide supporting documentation if available</li>
            <li>Appeals are reviewed by a separate committee</li>
            <li>You will receive a response within 10 business days</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Appeal Form */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-gray-900 mb-4">Appeal Details</h2>
            
            {/* Application Summary */}
            <div className="p-4 bg-gray-50 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Target Program</div>
                  <div className="text-gray-900">Computer Engineering</div>
                </div>
                <div>
                  <div className="text-gray-600">Decision</div>
                  <div className="text-red-600">Rejected</div>
                </div>
                <div>
                  <div className="text-gray-600">Decision Date</div>
                  <div className="text-gray-900">February 1, 2025</div>
                </div>
                <div>
                  <div className="text-gray-600">Appeal Deadline</div>
                  <div className="text-gray-900">February 6, 2025</div>
                </div>
              </div>
            </div>

            {/* Appeal Reason */}
            <div className="space-y-2">
              <Label htmlFor="appealReason">
                Reason for Appeal *
                <span className="text-sm text-gray-500 ml-2">(Minimum 50 characters)</span>
              </Label>
              <Textarea
                id="appealReason"
                rows={8}
                placeholder="Please explain in detail why you are appealing the decision. Include any specific errors you believe occurred in the evaluation process, missing documents that were not considered, or other relevant information."
                value={appealReason}
                onChange={(e) => setAppealReason(e.target.value)}
                className={errors.reason ? 'border-red-500' : ''}
              />
              <div className="flex justify-between">
                <div>
                  {errors.reason && (
                    <p className="text-xs text-red-600">{errors.reason}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {appealReason.length} characters
                </p>
              </div>
            </div>

            {/* Supporting Document */}
            <div className="space-y-2">
              <Label htmlFor="supportingDoc">
                Supporting Documentation (Optional)
              </Label>
              <p className="text-sm text-gray-600 mb-2">
                Upload any documents that support your appeal (e.g., grade corrections, missing certificates)
              </p>
              
              {!supportingDoc ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop a file here, or click to select
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PDF, JPG, PNG, DOC, DOCX • Max 10MB
                  </p>
                  <label htmlFor="fileUpload">
                    <Button type="button" variant="outline" onClick={() => document.getElementById('fileUpload')?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-900">{supportingDoc.name}</div>
                        <div className="text-xs text-gray-500">
                          {(supportingDoc.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSupportingDoc(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
              {errors.file && (
                <p className="text-xs text-red-600">{errors.file}</p>
              )}
            </div>
          </div>

          {/* Important Note */}
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Please Note:</strong> Once submitted, your appeal cannot be modified. 
              Make sure all information is accurate and complete.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              style={{ backgroundColor: '#C00000' }}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Appeal
            </Button>
          </div>
        </div>
      </Card>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Send className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center">Appeal Submitted Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              <p className="mb-4">
                Your appeal has been submitted and will be reviewed by the appeals committee.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg text-left text-sm space-y-2">
                <div>
                  <strong>Appeal Reference Number:</strong> APPEAL-2025-001234
                </div>
                <div>
                  <strong>Submission Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div>
                  <strong>Expected Response:</strong> Within 10 business days
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-600">
                You will receive an email notification when your appeal has been reviewed.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={handleModalClose} style={{ backgroundColor: '#C00000' }}>
              Return to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
