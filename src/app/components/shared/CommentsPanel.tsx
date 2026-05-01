import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  content: string;
  visibility: 'internal' | 'shared_with_student' | 'all_actors';
}

interface CommentsPanelProps {
  applicationId: string;
  currentUserRole: string;
  comments?: Comment[];
  onAddComment?: (content: string, visibility: string) => void;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'Mehmet Demir',
    role: 'ÖİDB',
    timestamp: '2025-01-11 09:15',
    content: 'All documents verified. Application forwarded to YDYO for language review.',
    visibility: 'all_actors'
  },
  {
    id: '2',
    author: 'Ayşe Kaya',
    role: 'YDYO',
    timestamp: '2025-01-12 10:30',
    content: 'TOEFL score verified. Student meets language requirements.',
    visibility: 'all_actors'
  },
  {
    id: '3',
    author: 'Fatma Şahin',
    role: 'YGK',
    timestamp: '2025-01-14 14:20',
    content: 'Internal note: Student has strong academic background. Previous courses align well with our curriculum.',
    visibility: 'internal'
  }
];

export function CommentsPanel({ 
  applicationId, 
  currentUserRole,
  comments = MOCK_COMMENTS,
  onAddComment 
}: CommentsPanelProps) {
  const [newComment, setNewComment] = useState('');
  const [visibility, setVisibility] = useState<'internal' | 'shared_with_student' | 'all_actors'>('all_actors');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment, visibility);
      setNewComment('');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="w-5 h-5" style={{ color: '#C00000' }} />
        <h3 className="text-gray-900">Comments & Notes</h3>
        <Badge variant="outline" className="text-xs">{comments.length}</Badge>
      </div>

      {/* Comments List */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">{comment.author}</span>
                  <Badge variant="outline" className="text-xs">{comment.role}</Badge>
                </div>
                <div className="text-xs text-gray-500">{comment.timestamp}</div>
              </div>
              {comment.visibility === 'internal' && (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">Internal Only</Badge>
              )}
              {comment.visibility === 'shared_with_student' && (
                <Badge className="bg-blue-100 text-blue-800 text-xs">Visible to Student</Badge>
              )}
            </div>
            <div className="text-sm text-gray-700">{comment.content}</div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-900">Add Comment</div>
        <Textarea
          rows={3}
          placeholder="Enter your comment or note..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">Visibility:</span>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as any)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value="all_actors">All Actors</option>
              <option value="shared_with_student">Shared with Student</option>
              <option value="internal">Internal Only</option>
            </select>
          </div>
          
          <Button 
            size="sm" 
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            style={{ backgroundColor: '#C00000' }}
          >
            <Send className="w-4 h-4 mr-2" />
            Add Comment
          </Button>
        </div>
      </div>
    </Card>
  );
}
