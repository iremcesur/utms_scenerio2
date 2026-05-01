import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowLeft, Eye } from 'lucide-react';

interface PipelineViewProps {
  onBack: () => void;
  onViewApplication: (appId: string) => void;
}

interface PipelineColumn {
  id: string;
  title: string;
  color: string;
  applications: {
    id: string;
    studentName: string;
    program: string;
    daysInStage: number;
    priority?: 'high' | 'normal';
  }[];
}

const PIPELINE_DATA: PipelineColumn[] = [
  {
    id: 'intake',
    title: 'Intake Verification',
    color: '#F59E0B',
    applications: [
      { id: 'APP-2025-001234', studentName: 'Ahmet Yılmaz', program: 'Computer Eng.', daysInStage: 1, priority: 'high' },
      { id: 'APP-2025-001235', studentName: 'Ayşe Demir', program: 'Electrical Eng.', daysInStage: 2 }
    ]
  },
  {
    id: 'ydyo',
    title: 'YDYO Review',
    color: '#8B5CF6',
    applications: [
      { id: 'APP-2025-001240', studentName: 'Can Öztürk', program: 'Mechanical Eng.', daysInStage: 3 },
      { id: 'APP-2025-001242', studentName: 'Mustafa Çelik', program: 'Civil Eng.', daysInStage: 1 }
    ]
  },
  {
    id: 'ygk',
    title: 'YGK Evaluation',
    color: '#3B82F6',
    applications: [
      { id: 'APP-2025-001245', studentName: 'Elif Yıldız', program: 'Computer Eng.', daysInStage: 5 },
      { id: 'APP-2025-001246', studentName: 'Burak Demir', program: 'Industrial Eng.', daysInStage: 4 },
      { id: 'APP-2025-001248', studentName: 'Selin Koç', program: 'Computer Eng.', daysInStage: 2 }
    ]
  },
  {
    id: 'dean',
    title: "Dean's Office",
    color: '#10B981',
    applications: [
      { id: 'APP-2025-001250', studentName: 'Emre Arslan', program: 'Electrical Eng.', daysInStage: 2 }
    ]
  },
  {
    id: 'board',
    title: 'Faculty Board',
    color: '#6366F1',
    applications: [
      { id: 'APP-2025-001252', studentName: 'Zeynep Kara', program: 'Mechanical Eng.', daysInStage: 7 }
    ]
  },
  {
    id: 'final',
    title: 'Ready for Publication',
    color: '#059669',
    applications: []
  }
];

export function PipelineView({ onBack, onViewApplication }: PipelineViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Application Pipeline</h1>
          <p className="text-gray-600">Track applications through each stage of the review process</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {PIPELINE_DATA.map((column) => (
          <Card key={column.id} className="p-4">
            <div className="text-xs text-gray-600 mb-1">{column.title}</div>
            <div className="text-2xl text-gray-900">{column.applications.length}</div>
            <div className="mt-2 h-1 rounded-full" style={{ backgroundColor: column.color }}></div>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 min-w-max">
          {PIPELINE_DATA.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0">
              <Card className="h-full">
                <div 
                  className="p-4 rounded-t-lg flex items-center justify-between"
                  style={{ backgroundColor: column.color }}
                >
                  <h3 className="text-white">{column.title}</h3>
                  <Badge className="bg-white/20 text-white border-0">
                    {column.applications.length}
                  </Badge>
                </div>

                <div className="p-4 space-y-3 min-h-[400px]">
                  {column.applications.map((app) => (
                    <Card 
                      key={app.id} 
                      className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4"
                      style={{ borderLeftColor: column.color }}
                      onClick={() => onViewApplication(app.id)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="text-sm text-gray-900">{app.studentName}</div>
                          {app.priority === 'high' && (
                            <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-600">{app.program}</div>
                        <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                          ID: {app.id}
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs text-gray-500">
                            {app.daysInStage} {app.daysInStage === 1 ? 'day' : 'days'} in stage
                          </span>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {column.applications.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">
                      No applications in this stage
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Average Time per Stage</h3>
          <div className="space-y-3">
            {PIPELINE_DATA.slice(0, 5).map((column) => (
              <div key={column.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{column.title}</span>
                <span className="text-sm text-gray-900">
                  {Math.floor(Math.random() * 5) + 2} days
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Bottlenecks</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-sm text-gray-900 mb-1">YGK Evaluation</div>
              <div className="text-xs text-gray-600">3 applications over 3 days</div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="text-sm text-gray-900 mb-1">Faculty Board</div>
              <div className="text-xs text-gray-600">1 application over 7 days</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">This Week</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">New Applications</span>
              <span className="text-sm text-gray-900">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completed Reviews</span>
              <span className="text-sm text-gray-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Returned for Correction</span>
              <span className="text-sm text-gray-900">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Published Results</span>
              <span className="text-sm text-gray-900">8</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
