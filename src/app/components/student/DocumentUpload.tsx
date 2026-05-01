import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Upload, 
  File, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Eye,
  ArrowLeft,
  Send
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface DocumentUploadProps {
  applicationId: string;
  applicationData: any;
  onComplete: () => void;
  onBack: () => void;
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  required: boolean;
  maxSize: number; // in MB
  acceptedFormats: string[];
}

const REQUIRED_DOCUMENTS: DocumentType[] = [
  {
    id: 'transcript',
    name: 'Official Transcript',
    description: 'Complete academic transcript from current university',
    required: true,
    maxSize: 10,
    acceptedFormats: ['PDF', 'JPG', 'PNG']
  },
  {
    id: 'osym_result',
    name: 'ÖSYM Exam Result',
    description: 'Official ÖSYM score document',
    required: true,
    maxSize: 10,
    acceptedFormats: ['PDF', 'JPG', 'PNG']
  },
  {
    id: 'curriculum',
    name: 'Program Curriculum',
    description: 'Current program curriculum from your university',
    required: true,
    maxSize: 10,
    acceptedFormats: ['PDF']
  },
  {
    id: 'student_certificate',
    name: 'Student Certificate',
    description: 'Current enrollment certificate',
    required: true,
    maxSize: 10,
    acceptedFormats: ['PDF', 'JPG', 'PNG']
  },
  {
    id: 'language_proficiency',
    name: 'English Proficiency Certificate',
    description: 'TOEFL, IELTS, or YDS certificate (if applicable)',
    required: false,
    maxSize: 10,
    acceptedFormats: ['PDF', 'JPG', 'PNG']
  },
  {
    id: 'course_contents',
    name: 'Course Contents/Syllabi',
    description: 'Detailed course descriptions from previous courses',
    required: true,
    maxSize: 10,
    acceptedFormats: ['PDF']
  }
];

export function DocumentUpload({ applicationId, applicationData, onComplete, onBack }: DocumentUploadProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, { file: File; status: 'valid' | 'invalid'; error?: string }>>({});
  const [showReplaceModal, setShowReplaceModal] = useState<string | null>(null);

  const validateFile = (file: File, docType: DocumentType): { valid: boolean; error?: string } => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > docType.maxSize) {
      return { valid: false, error: `File size exceeds ${docType.maxSize}MB limit` };
    }

    // Check file format
    const fileExt = file.name.split('.').pop()?.toUpperCase();
    if (!fileExt || !docType.acceptedFormats.includes(fileExt)) {
      return { valid: false, error: `Only ${docType.acceptedFormats.join(', ')} files are allowed` };
    }

    return { valid: true };
  };

  const generateFileName = (docTypeId: string, originalName: string) => {
    const ext = originalName.split('.').pop();
    return `${applicationId}_${docTypeId}_${applicationData?.tckn || '12345678901'}.${ext}`;
  };

  const handleFileUpload = (docType: DocumentType, file: File) => {
    const validation = validateFile(file, docType);
    
    if (validation.valid) {
      setUploadedDocs({
        ...uploadedDocs,
        [docType.id]: {
          file,
          status: 'valid'
        }
      });
    } else {
      setUploadedDocs({
        ...uploadedDocs,
        [docType.id]: {
          file,
          status: 'invalid',
          error: validation.error
        }
      });
    }
  };

  const handleRemoveFile = (docTypeId: string) => {
    const newDocs = { ...uploadedDocs };
    delete newDocs[docTypeId];
    setUploadedDocs(newDocs);
  };

  const canSubmit = () => {
    const requiredDocs = REQUIRED_DOCUMENTS.filter(doc => doc.required);
    return requiredDocs.every(doc => 
      uploadedDocs[doc.id] && uploadedDocs[doc.id].status === 'valid'
    );
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      // In a real app, this would upload files to backend
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Upload Required Documents</h1>
          <p className="text-gray-600">Application ID: {applicationId}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>
      </div>

      {/* Instructions */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Upload Guidelines:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>All required documents must be uploaded to submit your application</li>
            <li>Files must be in PDF, JPG, or PNG format</li>
            <li>Maximum file size: 10 MB per document</li>
            <li>Files will be automatically renamed according to system standards</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Document Upload Cards */}
      <div className="grid grid-cols-1 gap-4">
        {REQUIRED_DOCUMENTS.map((docType) => {
          const uploaded = uploadedDocs[docType.id];
          const isUploaded = !!uploaded;
          const isValid = uploaded?.status === 'valid';

          return (
            <Card key={docType.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-gray-900">{docType.name}</h3>
                    {docType.required && (
                      <span className="text-xs text-red-600">*Required</span>
                    )}
                    {isUploaded && isValid && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {isUploaded && !isValid && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{docType.description}</p>
                  <p className="text-xs text-gray-500">
                    Accepted formats: {docType.acceptedFormats.join(', ')} • Max size: {docType.maxSize}MB
                  </p>

                  {/* Uploaded File Info */}
                  {isUploaded && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <File className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="text-sm text-gray-900">{uploaded.file.name}</div>
                            <div className="text-xs text-gray-500">
                              Will be saved as: {generateFileName(docType.id, uploaded.file.name)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Size: {(uploaded.file.size / 1024).toFixed(2)} KB
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveFile(docType.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {!isValid && uploaded.error && (
                        <div className="mt-2 text-xs text-red-600">
                          ⚠ {uploaded.error}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="ml-4">
                  <label htmlFor={`upload-${docType.id}`}>
                    <Button 
                      type="button"
                      variant={isUploaded ? "outline" : "default"}
                      style={!isUploaded ? { backgroundColor: '#C00000' } : undefined}
                      onClick={() => document.getElementById(`upload-${docType.id}`)?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploaded ? 'Replace' : 'Upload'}
                    </Button>
                  </label>
                  <input
                    id={`upload-${docType.id}`}
                    type="file"
                    className="hidden"
                    accept={docType.acceptedFormats.map(f => `.${f.toLowerCase()}`).join(',')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(docType, file);
                      }
                    }}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Progress Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 mb-1">Upload Progress</h3>
            <p className="text-sm text-gray-600">
              {Object.values(uploadedDocs).filter(doc => doc.status === 'valid').length} of {REQUIRED_DOCUMENTS.filter(d => d.required).length} required documents uploaded
            </p>
          </div>
          <div className="text-right">
            {canSubmit() ? (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            ) : (
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            )}
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!canSubmit()}
          style={{ backgroundColor: '#C00000' }}
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Final Application
        </Button>
      </div>

      {!canSubmit() && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please upload all required documents before submitting your application.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
