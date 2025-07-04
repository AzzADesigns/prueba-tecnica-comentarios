import { useState } from "react";
import { Comment } from "../adapters/CommentsApi";

export function useOptimisticUpdates() {
    const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());
    const [editedComments, setEditedComments] = useState<Map<number, Comment>>(
        new Map(),
    );

    const markAsDeleted = (id: number) => {
        setDeletedIds((prev) => new Set(prev).add(id));
    };

    const unmarkAsDeleted = (id: number) => {
        setDeletedIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const markAsEdited = (id: number, comment: Comment) => {
        setEditedComments((prev) => new Map(prev).set(id, comment));
    };

    const unmarkAsEdited = (id: number) => {
        setEditedComments((prev) => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    };

    const applyOptimisticUpdates = (comments: Comment[]): Comment[] => {
        return comments
            .filter((c: Comment) => !deletedIds.has(c.id!))
            .map((c: Comment) => editedComments.get(c.id!) || c);
    };

    return {
        deletedIds,
        editedComments,
        markAsDeleted,
        unmarkAsDeleted,
        markAsEdited,
        unmarkAsEdited,
        applyOptimisticUpdates,
    };
}
