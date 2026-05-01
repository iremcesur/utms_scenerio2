import { useState } from 'react';
import { Layout } from '../Layout';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  TrendingUp, 
  FileCheck,
  List,
  Award
} from 'lucide-react';
import type { User } from '../../App';
import { AcademicEligibility } from './AcademicEligibility';
import { RankingTable } from './RankingTable';
import { IntibakGeneration } from './IntibakGeneration';

interface YGKDashboardProps {
  user: User;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

type YGKView = 'dashboard' | 'eligibility' | 'ranking' | 'intibak';

export function YGKDashboard({ user, onLogout, onSwitchRole }: YGKDashboardProps) {
  const [currentView, setCurrentView] = useState<YGKView>('dashboard');

  if (currentView === 'eligibility') {
    return (
      <Layout user={user} currentRole="YGK" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <AcademicEligibility onBack={() => setCurrentView('dashboard')} />
      </Layout>
    );
  }

  if (currentView === 'ranking') {
    return (
      <Layout user={user} currentRole="YGK" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <RankingTable onBack={() => setCurrentView('dashboard')} />
      </Layout>
    );
  }

  if (currentView === 'intibak') {
    return (
      <Layout user={user} currentRole="YGK" onLogout={onLogout} onSwitchRole={onSwitchRole}>
        <IntibakGeneration onBack={() => setCurrentView('dashboard')} />
      </Layout>
    );
  }

  return (
    <Layout user={user} currentRole="YGK" onLogout={onLogout} onSwitchRole={onSwitchRole}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-gray-900 mb-2">YGK Dashboard</h1>
          <p className="text-gray-600">Departmental Transfer Commission - Academic Evaluation & Ranking</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Applicants</div>
                <div className="text-2xl text-gray-900">24</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Eligible</div>
                <div className="text-2xl text-gray-900">18</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Ranked</div>
                <div className="text-2xl text-gray-900">18</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">İntibak Prepared</div>
                <div className="text-2xl text-gray-900">12</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Program Quotas */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Transfer Quotas by Semester</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-gray-900">3rd Semester Entry</div>
                  <div className="text-sm text-gray-600">2nd Year Transfer</div>
                </div>
                <Badge>Quota: 8</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Applicants:</span>
                  <span className="text-gray-900">15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Eligible:</span>
                  <span className="text-gray-900">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Asil (Direct):</span>
                  <span className="text-green-600">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yedek (Waitlist):</span>
                  <span className="text-yellow-600">4</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-gray-900">5th Semester Entry</div>
                  <div className="text-sm text-gray-600">3rd Year Transfer</div>
                </div>
                <Badge>Quota: 4</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Applicants:</span>
                  <span className="text-gray-900">9</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Eligible:</span>
                  <span className="text-gray-900">6</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Asil (Direct):</span>
                  <span className="text-green-600">4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yedek (Waitlist):</span>
                  <span className="text-yellow-600">2</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Workflow Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center space-y-2"
            onClick={() => setCurrentView('eligibility')}
          >
            <FileCheck className="w-8 h-8" style={{ color: '#7A1616' }} />
            <div>
              <div className="text-sm">Academic Eligibility Review</div>
              <div className="text-xs text-gray-500 mt-1">Review GPA, semester, requirements</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center space-y-2"
            onClick={() => setCurrentView('ranking')}
          >
            <List className="w-8 h-8" style={{ color: '#7A1616' }} />
            <div>
              <div className="text-sm">Ranking & Lists</div>
              <div className="text-xs text-gray-500 mt-1">Generate Asil/Yedek lists</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center space-y-2"
            onClick={() => setCurrentView('intibak')}
          >
            <Award className="w-8 h-8" style={{ color: '#7A1616' }} />
            <div>
              <div className="text-sm">Course Equivalence (İntibak)</div>
              <div className="text-xs text-gray-500 mt-1">Map courses from previous institution</div>
            </div>
          </Button>
        </div>

        {/* Scoring Formula */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Transfer Score Calculation Formula</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-900 mb-2">
              <strong>Transfer Score = (GPA × 0.60) + (ÖSYM Score ÷ 6 × 0.40)</strong>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>• GPA Component: 60% weight (normalized to 100)</div>
              <div>• ÖSYM Component: 40% weight (normalized to 100)</div>
              <div>• Additional points may be awarded for specific departmental requirements</div>
              <div>• Language proficiency exemption: +5 bonus points</div>
            </div>
          </div>
        </Card>

        {/* Department-Specific Requirements */}
        <Card className="p-6">
          <h2 className="text-gray-900 mb-4">Computer Engineering Department Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-900 mb-2">Minimum Academic Requirements</div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>✓ Minimum GPA: 2.50 / 4.00</li>
                <li>✓ Completed programming course (min. C grade)</li>
                <li>✓ Calculus I completion (min. C grade)</li>
                <li>✓ No disciplinary actions</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-900 mb-2">Prerequisite Courses</div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Introduction to Programming</li>
                <li>• Calculus I</li>
                <li>• Physics I (recommended)</li>
                <li>• Linear Algebra (recommended)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
