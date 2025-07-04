import React from "react";
import { Comment } from "../adapters/CommentsApi";
import { CommentCard } from "@/GLOBAL/ui";
import { isValidComment } from "../utils/commentUtils";

export interface CommentGridProps {
    comments: Comment[];
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
    deletingIds?: Set<number>;
}

export const CommentGrid: React.FC<CommentGridProps> = ({
    comments,
    onEdit,
    onDelete,
    deletingIds = new Set(),
}) => {
    return (
        <div
            style={{
                display: "grid",
                gap: 16,
                gridTemplateColumns: "repeat(auto-fit, 340px)",
                justifyContent: "center",
                maxWidth: 1200,
                margin: "0 auto",
            }}
        >
            {comments.filter(isValidComment).map((comment) => (
                <div key={comment.id} style={{ width: 340 }}>
                    <CommentCard
                        title={comment.name}
                        body={comment.body}
                        email={comment.email}
                        onEdit={onEdit ? () => onEdit(comment.id!) : undefined}
                        onDelete={
                            onDelete ? () => onDelete(comment.id!) : undefined
                        }
                        isDeleting={deletingIds.has(comment.id!)}
                    />
                </div>
            ))}
        </div>
    );
};
