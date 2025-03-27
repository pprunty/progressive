'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Comments, Comment, CommentFormData } from './comments';

// Mock initial data
const mockComments: Comment[] = [
  {
    id: '1',
    author: 'John Doe',
    content: 'This is a great component!',
    timestamp: new Date(Date.UTC(2024, 2, 26, 10, 0, 0)), // March 26, 2024 10:00:00 UTC
    score: 5,
    replies: [
      {
        id: '2',
        author: 'Jane Smith',
        content: 'I agree, very useful!',
        timestamp: new Date(Date.UTC(2024, 2, 26, 10, 30, 0)), // March 26, 2024 10:30:00 UTC
        score: 3,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: 'Bob Wilson',
    content: 'Love the voting feature.',
    timestamp: new Date(Date.UTC(2024, 2, 26, 11, 0, 0)), // March 26, 2024 11:00:00 UTC
    score: 2,
    replies: [],
  },
];

// Mock API functions
const mockApi = {
  getComments: async (): Promise<Comment[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockComments;
  },
  addComment: async (comment: CommentFormData): Promise<Comment> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...comment,
      timestamp: new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate(),
        ),
      ), // Use UTC date
      score: 0,
      replies: [],
    };
  },
  addReply: async (
    parentId: string,
    reply: CommentFormData,
  ): Promise<Comment> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: Math.random().toString(36).substr(2, 9),
      ...reply,
      timestamp: new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate(),
        ),
      ), // Use UTC date
      score: 0,
      replies: [],
    };
  },
  updateScore: async (commentId: string, increment: boolean): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

// Helper function to update comment scores recursively
function updateCommentScore(
  comments: Comment[],
  commentId: string,
  increment: boolean,
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, score: comment.score + (increment ? 1 : -1) };
    }
    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: updateCommentScore(comment.replies, commentId, increment),
      };
    }
    return comment;
  });
}

// Helper function to add replies recursively
function addReplyToComment(
  comments: Comment[],
  parentId: string,
  newReply: Comment,
): Comment[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, newReply] };
    }
    if (comment.replies.length > 0) {
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, parentId, newReply),
      };
    }
    return comment;
  });
}

function CommentsDemo() {
  const [collapsedComments, setCollapsedComments] = useState<Set<string>>(
    new Set(),
  );
  const revalidate = 60; // 60 seconds

  // Use SWR for data fetching and caching
  const { data: comments = mockComments, mutate } = useSWR(
    'comments',
    mockApi.getComments,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: revalidate * 1000,
      fallbackData: mockComments, // Use mock data as initial data
    },
  );

  const handleAddComment = async (comment: CommentFormData) => {
    const newComment = await mockApi.addComment(comment);
    mutate([newComment, ...comments], false);
  };

  const handleAddReply = async (parentId: string, reply: CommentFormData) => {
    const newReply = await mockApi.addReply(parentId, reply);
    mutate(addReplyToComment(comments, parentId, newReply), false);
  };

  const handleUpdateScore = async (commentId: string, increment: boolean) => {
    await mockApi.updateScore(commentId, increment);
    mutate(updateCommentScore(comments, commentId, increment), false);
  };

  const handleToggleCollapse = (commentId: string) => {
    setCollapsedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  // Map collapsed state to comments
  const commentsWithCollapsedState = comments.map((comment) => ({
    ...comment,
    isCollapsed: collapsedComments.has(comment.id),
    replies: comment.replies.map((reply) => ({
      ...reply,
      isCollapsed: collapsedComments.has(reply.id),
    })),
  }));

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Demo: Comments</h3>
        <p className="text-muted-foreground">
          A comments component with support for nested replies, voting, and
          collapsible threads. This demo uses SWR for data fetching and
          automatically refreshes every {revalidate} seconds.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <Comments
          comments={commentsWithCollapsedState}
          onAddComment={handleAddComment}
          onAddReply={handleAddReply}
          onUpdateScore={handleUpdateScore}
          onToggleCollapse={handleToggleCollapse}
        />
      </div>
    </div>
  );
}

// Default export for the registry
export default CommentsDemo;
