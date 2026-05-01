import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  ArrowLeft,
  FileText,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Calendar,
  Award
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { CommentsPanel } from '../shared/CommentsPanel';
import { toast } from 'sonner';

interface LanguageReviewDetailProps {
  applicationId: string;
  onBack: () => void;
}

const MOCK_APPLICATION = {
  id: 'APP-2025-001234',
  studentName: 'Ahmet Yılmaz',
  studentId: '202012345',
  program: 'Computer Engineering',
  faculty: 'Engineering Faculty',
  languageDoc: {
    type: 'TOEFL iBT',
    score: 88,
    examDate: '2024-08-15',
    validUntil: '2026-08-15',
    certificateNumber: 'TOEFL-2024-12345',
    documentUrl: '#'
  },
  submittedDate: '2025-01-12',
  currentStatus: 'pending'
};

const VALIDATION_RULES = {
  'TOEFL iBT': {
    minScore: 79,
    exemptScore: 90,
    validityPeriod: '2 years from exam date'
  },
  'IELTS Academic': {
    minScore: 6.0,
    exemptScore: 7.0,
    validityPeriod: '2 years from exam date'
  },
  'YDS': {
    minScore: 70,
    exemptScore: 85,
    validityPeriod: '5 years from exam date'
  }
};

export function LanguageReviewDetail({ applicationId, onBack }: LanguageReviewDetailProps) {
  const [decision, setDecision] = useState<'successful' | 'unsuccessful' | 'exempt' | ''>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDecision = () => {
    if (!decision) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast based on decision
      if (decision === 'successful') {
        toast.success('Language evaluation submitted successfully', {
          description: `Application ${applicationId} marked as Successful`
        });
      } else if (decision === 'exempt') {
        toast.success('Language evaluation submitted successfully', {
          description: `Application ${applicationId} marked as Exempt with +5 bonus points`
        });
      } else {
        toast.warning('Language evaluation submitted', {
          description: `Application ${applicationId} marked as Unsuccessful`
        });
      }
      
      onBack();
    }, 1000);
  };

  const rules = VALIDATION_RULES[MOCK_APPLICATION.languageDoc.type as keyof typeof VALIDATION_RULES];
  const score = MOCK_APPLICATION.languageDoc.score;
  const meetsMinimum = score >= rules.minScore;
  const qualifiesForExemption = score >= rules.exemptScore;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Language Proficiency Verification</h1>
          <p className="text-gray-600">
            {MOCK_APPLICATION.id} - {MOCK_APPLICATION.studentName}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Queue
        </Button>
      </div>

      {/* Validation Rules Banner */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-1">
            <div><strong>Language Requirement Rules for {MOCK_APPLICATION.languageDoc.type}:</strong></div>
            <div className="text-sm">
              • Minimum Passing Score: <strong>{rules.minScore}</strong> {meetsMinimum ? '✓' : '✗'}
            </div>
            <div className="text-sm">
              • Exemption Threshold: <strong>{rules.exemptScore}</strong> {qualifiesForExemption ? '✓' : '✗'}
            </div>
            <div className="text-sm">
              • Validity Period: {rules.validityPeriod}
            </div>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Student & Application Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Information */}
          <Card className="p-6">
            <h2 className="text-gray-900 mb-4">Student Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Student Name</div>
                <div className="text-gray-900">{MOCK_APPLICATION.studentName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Student ID</div>
                <div className="text-gray-900">{MOCK_APPLICATION.studentId}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Target Program</div>
                <div className="text-gray-900">{MOCK_APPLICATION.program}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Faculty</div>
                <div className="text-gray-900">{MOCK_APPLICATION.faculty}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Application Date</div>
                <div className="text-gray-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                  {MOCK_APPLICATION.submittedDate}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Current Status</div>
                <Badge className="bg-yellow-100 text-yellow-800">Pending YDYO Review</Badge>
              </div>
            </div>
          </Card>

          {/* Language Document Details */}
          <Card className="p-6">
            <h2 className="text-gray-900 mb-4">Language Certificate Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Exam Type</div>
                <div className="text-gray-900">{MOCK_APPLICATION.languageDoc.type}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Reported Score</div>
                <div className="text-2xl text-gray-900">{MOCK_APPLICATION.languageDoc.score}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Exam Date</div>
                <div className="text-gray-900">{MOCK_APPLICATION.languageDoc.examDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Valid Until</div>
                <div className="text-gray-900">{MOCK_APPLICATION.languageDoc.validUntil}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Certificate Number</div>
                <div className="text-gray-900">{MOCK_APPLICATION.languageDoc.certificateNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Result Assessment</div>
                <div className="space-y-1">
                  {meetsMinimum && (
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Meets minimum requirement
                    </div>
                  )}
                  {!meetsMinimum && (
                    <div className="flex items-center text-red-600 text-sm">
                      <XCircle className="w-4 h-4 mr-1" />
                      Below minimum requirement
                    </div>
                  )}
                  {qualifiesForExemption && (
                    <div className="flex items-center text-blue-600 text-sm">
                      <Award className="w-4 h-4 mr-1" />
                      Qualifies for language exemption
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Document Viewer */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-sm text-gray-900 mb-2">Language Certificate Document</div>
              <div className="text-xs text-gray-500 mb-4">
                Official language proficiency certificate uploaded by student
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Document
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <CommentsPanel 
            applicationId={applicationId}
            currentUserRole="YDYO"
          />
        </div>

        {/* Right Panel - Decision Form */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-6">
            <h2 className="text-gray-900 mb-4">Evaluation Decision</h2>
            
            <div className="space-y-4">
              {/* Decision Radio Buttons */}
              <div className="space-y-3">
                <Label>Select Decision *</Label>
                <RadioGroup value={decision} onValueChange={(value: any) => setDecision(value)}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-green-50 transition">
                      <RadioGroupItem value="successful" id="successful" />
                      <Label htmlFor="successful" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="text-sm text-gray-900">Successful</div>
                            <div className="text-xs text-gray-500">
                              Meets minimum requirement
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-red-50 transition">
                      <RadioGroupItem value="unsuccessful" id="unsuccessful" />
                      <Label htmlFor="unsuccessful" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <div>
                            <div className="text-sm text-gray-900">Unsuccessful / Invalid</div>
                            <div className="text-xs text-gray-500">
                              Below requirement or invalid
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 transition">
                      <RadioGroupItem value="exempt" id="exempt" />
                      <Label htmlFor="exempt" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <div>
                            <div className="text-sm text-gray-900">Exempt</div>
                            <div className="text-xs text-gray-500">
                              Qualifies for exemption (+5 bonus)
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Conditional Warning for Unsuccessful */}
              {decision === 'unsuccessful' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Please provide detailed notes explaining why the certificate is unsuccessful or invalid.
                  </AlertDescription>
                </Alert>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">
                  Evaluation Notes {decision === 'unsuccessful' && <span className="text-red-600">*</span>}
                </Label>
                <Textarea
                  id="notes"
                  rows={5}
                  placeholder="Add detailed notes about the language certificate evaluation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={decision === 'unsuccessful' && !notes ? 'border-red-300' : ''}
                />
                <p className="text-xs text-gray-500">
                  These notes will be visible to ÖIDB, YGK, and other reviewers.
                </p>
              </div>

              {/* Automatic Score Calculation Info */}
              {decision === 'exempt' && (
                <Alert>
                  <Award className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Language exemption will add <strong>+5 bonus points</strong> to the student's transfer score calculation.
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="pt-4 space-y-3">
                <Button 
                  onClick={handleSubmitDecision}
                  disabled={!decision || (decision === 'unsuccessful' && !notes.trim()) || isSubmitting}
                  className="w-full"
                  style={{ backgroundColor: '#C00000' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Evaluation'}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={onBack}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Reference */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="text-sm text-gray-900 mb-2">Quick Reference</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• TOEFL iBT: 79-89 Pass, ≥90 Exempt</div>
              <div>• IELTS: 6.0-6.9 Pass, ≥7.0 Exempt</div>
              <div>• YDS: 70-84 Pass, ≥85 Exempt</div>
              <div>• All certificates must be within validity period</div>
              <div>• Exemption awards +5 bonus points</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}