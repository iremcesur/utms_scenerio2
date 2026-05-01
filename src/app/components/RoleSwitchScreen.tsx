import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  GraduationCap, 
  UserCog, 
  Languages, 
  Users, 
  Building2, 
  Scale,
  Shield
} from 'lucide-react';
import type { UserRole } from '../App';

interface RoleSwitchScreenProps {
  roles: UserRole[];
  onSelectRole: (role: UserRole) => void;
  onLogout: () => void;
}

const ROLE_CONFIG: Record<UserRole, { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  color: string;
}> = {
  Student: {
    icon: GraduationCap,
    title: 'Student',
    description: 'Submit and track your transfer application',
    color: '#C00000'
  },
  OIDB: {
    icon: UserCog,
    title: 'Student Affairs Office (ÖİDB)',
    description: 'Verify applications and manage workflow',
    color: '#A82020'
  },
  YDYO: {
    icon: Languages,
    title: 'Foreign Languages Office (YDYO)',
    description: 'Review language proficiency documents',
    color: '#8B1A1A'
  },
  YGK: {
    icon: Users,
    title: 'Transfer Commission (YGK)',
    description: 'Evaluate academic eligibility and rankings',
    color: '#7A1616'
  },
  Dean: {
    icon: Building2,
    title: "Dean's Office",
    description: 'Review and forward evaluation packages',
    color: '#6B1313'
  },
  Board: {
    icon: Scale,
    title: 'Faculty Board',
    description: 'Final approval of transfer decisions',
    color: '#5C1010'
  },
  Admin: {
    icon: Shield,
    title: 'System Admin',
    description: 'Manage users, quotas, and system settings',
    color: '#4D0D0D'
  }
};

export function RoleSwitchScreen({ roles, onSelectRole, onLogout }: RoleSwitchScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-2">Select Your Role</h1>
          <p className="text-gray-600">Choose which role you want to access</p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const config = ROLE_CONFIG[role];
            const Icon = config.icon;
            
            return (
              <Card
                key={role}
                className="p-6 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                onClick={() => onSelectRole(role)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: config.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">{config.title}</h3>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                  <Button 
                    className="w-full"
                    style={{ backgroundColor: config.color }}
                  >
                    Enter as {config.title.split(' ')[0]}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
