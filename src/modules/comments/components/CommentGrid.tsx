import React from 'react';
import { Comment } from '../adapters/CommentsApi';
import { CommentCard } from '@/GLOBAL/ui';

export interface CommentGridProps {
    comments: Comment[];
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export const CommentGrid: React.FC<CommentGridProps> = ({ comments, onEdit, onDelete }) => {
    return (
        <div
            style={{
                display: 'grid',
                gap: 16,
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                justifyItems: 'center',
                maxWidth: 1200,
                margin: '0 auto',
            }}
        >
            {comments.map((comment) => (
                <div key={comment.id}>
                    <CommentCard
                        title={comment.name}
                        body={comment.body}
                        email={comment.email}
                        onEdit={onEdit ? () => onEdit(comment.id!) : undefined}
                        onDelete={onDelete ? () => onDelete(comment.id!) : undefined}
                    />
                </div>
            ))}
        </div>
    );
}; 