import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface IntibakGenerationProps {
  onBack: () => void;
}

const PREVIOUS_COURSES = [
  { code: 'CS101', name: 'Introduction to Programming', credits: 4, grade: 'A' },
  { code: 'CS201', name: 'Data Structures', credits: 4, grade: 'B+' },
  { code: 'MATH101', name: 'Calculus I', credits: 4, grade: 'A-' },
  { code: 'PHYS101', name: 'Physics I', credits: 3, grade: 'B' },
];

const TARGET_COURSES = [
  { code: 'COMP 101', name: 'Programming Fundamentals', credits: 4 },
  { code: 'COMP 201', name: 'Data Structures & Algorithms', credits: 4 },
  { code: 'MATH 101', name: 'Calculus I', credits: 4 },
  { code: 'COMP 150', name: 'Digital Systems', credits: 4 },
  { code: 'PHYS 101', name: 'Physics I', credits: 3 },
];

export function IntibakGeneration({ onBack }: IntibakGenerationProps) {
  const [mappings, setMappings] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Course Equivalence (İntibak)</h1>
          <p className="text-gray-600">APP-2025-001234 - Ahmet Yılmaz</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Map Previous Courses to Target Curriculum</h2>
        <div className="space-y-4">
          {PREVIOUS_COURSES.map((prev, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <div className="text-sm text-gray-600">Previous Course</div>
                  <div className="text-gray-900">{prev.code} - {prev.name}</div>
                  <div className="text-sm text-gray-600 mt-1">Credits: {prev.credits} | Grade: {prev.grade}</div>
                </div>
                <div>
                  <Select value={mappings[prev.code]} onValueChange={(val) => setMappings({...mappings, [prev.code]: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equivalent course..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_COURSES.map((target) => (
                        <SelectItem key={target.code} value={target.code}>
                          {target.code} - {target.name} ({target.credits} cr)
                        </SelectItem>
                      ))}
                      <SelectItem value="no-equivalent">No Equivalent</SelectItem>
                    </SelectContent>
                  </Select>
                  {mappings[prev.code] && mappings[prev.code] !== 'no-equivalent' && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Mapped
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t flex justify-between">
          <div className="text-sm text-gray-600">
            Total Credits Transferred: 15 / Required Additional: 1
          </div>
          <Button style={{ backgroundColor: '#C00000' }}>
            <Save className="w-4 h-4 mr-2" />
            Save İntibak Table
          </Button>
        </div>
      </Card>
    </div>
  );
}