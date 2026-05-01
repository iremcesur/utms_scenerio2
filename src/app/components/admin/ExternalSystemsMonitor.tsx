import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Activity,
  Database,
  Shield,
  FileCheck
} from 'lucide-react';

interface ExternalSystemsMonitorProps {
  onBack: () => void;
}

const EXTERNAL_SYSTEMS = [
  {
    id: 'nvi',
    name: 'NVI (Nüfus ve Vatandaşlık İşleri)',
    description: 'Identity Verification Service',
    icon: Shield,
    status: 'online',
    uptime: '99.8%',
    lastSync: '2 minutes ago',
    avgResponseTime: '245ms',
    todayRequests: 3847,
    successRate: '99.9%',
    endpoints: [
      { name: 'Verify TC Identity', status: 'operational' },
      { name: 'Get Citizen Data', status: 'operational' }
    ]
  },
  {
    id: 'yoksis',
    name: 'YÖKSİS',
    description: 'Higher Education Information System',
    icon: Database,
    status: 'online',
    uptime: '98.2%',
    lastSync: '5 minutes ago',
    avgResponseTime: '580ms',
    todayRequests: 2156,
    successRate: '98.5%',
    endpoints: [
      { name: 'Get Student Academic Record', status: 'operational' },
      { name: 'Get Current GPA', status: 'operational' },
      { name: 'Verify Enrollment Status', status: 'operational' }
    ]
  },
  {
    id: 'osym',
    name: 'ÖSYM',
    description: 'Student Selection and Placement Center',
    icon: FileCheck,
    status: 'degraded',
    uptime: '94.5%',
    lastSync: '45 minutes ago',
    avgResponseTime: '1250ms',
    todayRequests: 1892,
    successRate: '92.3%',
    endpoints: [
      { name: 'Get YKS/ÖSYS Score', status: 'degraded' },
      { name: 'Verify Exam Result', status: 'operational' }
    ]
  },
  {
    id: 'ebys',
    name: 'EBYS',
    description: 'Electronic Document Management System',
    icon: Activity,
    status: 'online',
    uptime: '99.5%',
    lastSync: '1 minute ago',
    avgResponseTime: '320ms',
    todayRequests: 5234,
    successRate: '99.7%',
    endpoints: [
      { name: 'Validate Document Authenticity', status: 'operational' },
      { name: 'Get Document Metadata', status: 'operational' }
    ]
  }
];

const RECENT_API_LOGS = [
  {
    timestamp: '2025-01-18 14:32:15',
    system: 'NVI',
    endpoint: 'Verify TC Identity',
    request: 'TCKN: 12345678901',
    status: 'success',
    responseTime: '234ms',
    statusCode: 200
  },
  {
    timestamp: '2025-01-18 14:31:58',
    system: 'YÖKSİS',
    endpoint: 'Get Student Academic Record',
    request: 'Student ID: 2021234567',
    status: 'success',
    responseTime: '542ms',
    statusCode: 200
  },
  {
    timestamp: '2025-01-18 14:30:42',
    system: 'ÖSYM',
    endpoint: 'Get YKS Score',
    request: 'TC: 98765432109, Year: 2024',
    status: 'error',
    responseTime: '2150ms',
    statusCode: 504,
    error: 'Gateway timeout'
  },
  {
    timestamp: '2025-01-18 14:29:33',
    system: 'EBYS',
    endpoint: 'Validate Document',
    request: 'Doc ID: DOC-2025-001234',
    status: 'success',
    responseTime: '298ms',
    statusCode: 200
  }
];

export function ExternalSystemsMonitor({ onBack }: ExternalSystemsMonitorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'operational':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2 };
      case 'degraded':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle };
      case 'offline':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: AlertTriangle };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">External System Integrations</h1>
          <p className="text-gray-600">Monitor and manage API connections to external verification systems</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button size="sm" variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
        </div>
      </div>

      {/* System Architecture Diagram */}
      <Card className="p-6">
        <h2 className="text-gray-900 mb-4">Integration Architecture</h2>
        <div className="flex items-center justify-center py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center max-w-5xl">
            {/* External Systems */}
            <div className="space-y-3 md:col-span-2">
              {EXTERNAL_SYSTEMS.map((system) => {
                const Icon = system.icon;
                const statusConfig = getStatusColor(system.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div key={system.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{system.name}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <StatusIcon className={`w-3 h-3 ${statusConfig.text}`} />
                        <span className={`text-xs ${statusConfig.text}`}>{system.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connection Lines */}
            <div className="flex items-center justify-center">
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-16 h-0.5 bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C00000' }}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Portal */}
            <div className="md:col-span-2">
              <div className="p-6 rounded-lg border-2" style={{ borderColor: '#C00000' }}>
                <div className="flex items-center justify-center mb-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C00000' }}>
                    <Database className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-900 mb-1">Transfer Management Portal</div>
                  <div className="text-xs text-gray-600">Central Application System</div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Badge className="bg-green-100 text-green-800">All Systems Connected</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXTERNAL_SYSTEMS.map((system) => {
          const Icon = system.icon;
          const statusConfig = getStatusColor(system.status);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={system.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">{system.name}</h3>
                    <p className="text-sm text-gray-600">{system.description}</p>
                  </div>
                </div>
                <Badge className={`${statusConfig.bg} ${statusConfig.text}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {system.status}
                </Badge>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600">Uptime</div>
                  <div className="text-sm text-gray-900">{system.uptime}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600">Success Rate</div>
                  <div className="text-sm text-gray-900">{system.successRate}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600">Avg Response</div>
                  <div className="text-sm text-gray-900">{system.avgResponseTime}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-xs text-gray-600">Today's Requests</div>
                  <div className="text-sm text-gray-900">{system.todayRequests.toLocaleString()}</div>
                </div>
              </div>

              {/* Endpoints */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">API Endpoints:</div>
                <div className="space-y-2">
                  {system.endpoints.map((endpoint, idx) => {
                    const epStatusConfig = getStatusColor(endpoint.status);
                    const EpStatusIcon = epStatusConfig.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{endpoint.name}</span>
                        <div className="flex items-center space-x-1">
                          <EpStatusIcon className={`w-3 h-3 ${epStatusConfig.text}`} />
                          <span className={`text-xs ${epStatusConfig.text}`}>{endpoint.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="text-xs text-gray-500">Last sync: {system.lastSync}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent API Activity Log */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Recent API Activity</h2>
          <Button size="sm" variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            View Full Logs
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">System</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Endpoint</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Request</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-700">Response Time</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_API_LOGS.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm text-gray-600">{log.timestamp}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{log.system}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{log.endpoint}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.request}</td>
                  <td className="py-3 px-4">
                    {log.status === 'success' ? (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {log.statusCode} Success
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        {log.statusCode} Error
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {RECENT_API_LOGS.some(log => log.error) && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-sm text-red-900 mb-1">Recent Errors Detected</div>
            <div className="text-xs text-red-700">
              {RECENT_API_LOGS.filter(log => log.error).map((log, idx) => (
                <div key={idx}>
                  • {log.system} - {log.endpoint}: {log.error} (Reference: {log.statusCode})
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
