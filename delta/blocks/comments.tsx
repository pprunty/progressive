'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/delta/components/button';
import { TextareaInput } from '@/delta/inputs/textarea-input';
import { TextInput } from '@/delta/inputs/text-input';
import { z } from 'zod';

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  score: number;
  replies: Comment[];
  isCollapsed?: boolean;
}

export interface CommentFormData {
  author: string;
  content: string;
}

export interface CommentActions {
  onAddComment?: (comment: CommentFormData) => Promise<void>;
  onAddReply?: (parentId: string, reply: CommentFormData) => Promise<void>;
  onUpdateScore?: (commentId: string, increment: boolean) => Promise<void>;
  onToggleCollapse?: (commentId: string) => void;
  onRevalidate?: () => Promise<void>;
}

interface CommentsProps extends CommentActions {
  comments: Comment[];
  className?: string;
  isLoading?: boolean;
  revalidateInterval?: number;
}

const commentSchema = z.object({
  author: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Comment cannot be empty'),
});

export function Comments({
  comments,
  onAddComment,
  onAddReply,
  onUpdateScore,
  onToggleCollapse,
  onRevalidate,
  className,
  isLoading = false,
  revalidateInterval = 60000, // Default to 60 seconds
}: CommentsProps) {
  const [newComment, setNewComment] = useState<CommentFormData>({
    author: '',
    content: '',
  });
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Set up revalidation interval
  useEffect(() => {
    if (!onRevalidate) return;

    const interval = setInterval(() => {
      onRevalidate();
    }, revalidateInterval);

    return () => clearInterval(interval);
  }, [onRevalidate, revalidateInterval]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = commentSchema.safeParse(newComment);
    if (result.success) {
      try {
        await onAddComment?.(result.data);
        setNewComment({ author: '', content: '' });
        setIsAddingComment(false);
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-foreground">Comments</h2>
        <Button
          variant="secondary"
          title={isAddingComment ? 'Cancel' : 'Add Comment'}
          onClick={() => setIsAddingComment(!isAddingComment)}
          disabled={isLoading}
        />
      </div>

      {isAddingComment && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 rounded-lg border bg-card text-card-foreground"
        >
          <TextInput
            label="Name"
            name="author"
            value={newComment.author}
            onChange={(e) =>
              setNewComment({ ...newComment, author: e.target.value })
            }
            placeholder="Your name"
            required
            disabled={isLoading}
          />
          <TextareaInput
            label="Comment"
            name="content"
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            placeholder="Write your comment..."
            required
            disabled={isLoading}
          />
          <Button type="submit" title="Submit" disabled={isLoading} />
        </form>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            onAddReply={onAddReply}
            onUpdateScore={onUpdateScore}
            onToggleCollapse={onToggleCollapse}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

interface CommentThreadProps
  extends Pick<
    CommentActions,
    'onAddReply' | 'onUpdateScore' | 'onToggleCollapse'
  > {
  comment: Comment;
  isLoading?: boolean;
}

function formatDate(date: Date): string {
  // Ensure consistent date format regardless of locale
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

function CommentThread({
  comment,
  onAddReply,
  onUpdateScore,
  onToggleCollapse,
  isLoading = false,
}: CommentThreadProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyData, setReplyData] = useState<CommentFormData>({
    author: '',
    content: '',
  });

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = commentSchema.safeParse(replyData);
    if (result.success) {
      try {
        await onAddReply?.(comment.id, result.data);
        setReplyData({ author: '', content: '' });
        setShowReplyForm(false);
      } catch (error) {
        console.error('Failed to add reply:', error);
      }
    }
  };

  const handleVote = async (increment: boolean) => {
    if (onUpdateScore) {
      try {
        await onUpdateScore(comment.id, increment);
      } catch (error) {
        console.error('Failed to update score:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center space-y-1">
          <button
            onClick={() => onToggleCollapse?.(comment.id)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            {comment.isCollapsed ? '▶' : '▼'}
          </button>
          <div className="flex flex-col items-center space-y-1">
            <button
              onClick={() => handleVote(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              ▲
            </button>
            <div className="text-sm font-medium text-foreground">
              {comment.score}
            </div>
            <button
              onClick={() => handleVote(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              ▼
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {comment.author}
            </span>
            <span>•</span>
            <span>{formatDate(comment.timestamp)}</span>
          </div>
          {!comment.isCollapsed && (
            <>
              <div className="mt-2 text-foreground">{comment.content}</div>
              <div className="mt-2 flex items-center space-x-2">
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                  disabled={isLoading}
                >
                  Reply
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showReplyForm && !comment.isCollapsed && (
        <form
          onSubmit={handleReply}
          className="ml-8 space-y-4 p-4 rounded-lg border bg-card text-card-foreground"
        >
          <TextInput
            label="Name"
            name="author"
            value={replyData.author}
            onChange={(e) =>
              setReplyData({ ...replyData, author: e.target.value })
            }
            placeholder="Your name"
            required
            disabled={isLoading}
          />
          <TextareaInput
            label="Reply"
            name="content"
            value={replyData.content}
            onChange={(e) =>
              setReplyData({ ...replyData, content: e.target.value })
            }
            placeholder="Write your reply..."
            required
            disabled={isLoading}
          />
          <div className="flex space-x-2">
            <Button type="submit" title="Submit" disabled={isLoading} />
            <Button
              type="button"
              variant="secondary"
              title="Cancel"
              onClick={() => setShowReplyForm(false)}
              disabled={isLoading}
            />
          </div>
        </form>
      )}

      {!comment.isCollapsed && comment.replies.length > 0 && (
        <div className="ml-8 space-y-4">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              onAddReply={onAddReply}
              onUpdateScore={onUpdateScore}
              onToggleCollapse={onToggleCollapse}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
