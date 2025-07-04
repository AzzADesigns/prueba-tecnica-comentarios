import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Comment } from "../adapters/CommentsApi";
import { useComments } from "./useComments";
import { useLocalCommentsStore } from "../store/localCommentsStore";
import { useOptimisticUpdatesStore } from "../store/optimisticUpdatesStore";
import { isLocalComment } from "../utils/commentUtils";

interface FeedbackState {
    success: string | null;
    error: string | null;
}

export const useCommentOperations = () => {
    const queryClient = useQueryClient();
    const { remove, edit } = useComments();
    const { removeLocalComment, editLocalComment } = useLocalCommentsStore();
    const {
        markAsDeleted,
        unmarkAsDeleted,
        markAsEdited,
        unmarkAsEdited,
        applyOptimisticUpdates,
    } = useOptimisticUpdatesStore();

    const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
    const [feedback, setFeedback] = useState<FeedbackState>({
        success: null,
        error: null,
    });
    const [editingComment, setEditingComment] = useState<Comment | null>(null);

    const clearFeedback = () => {
        setFeedback({ success: null, error: null });
    };

    const handleCommentDelete = async (id: number, allComments: Comment[]) => {
        const comment = allComments.find((c) => c.id === id);
        if (!comment) return;

        setDeletingIds((prev) => new Set(prev).add(id));

        const isLocal = isLocalComment(comment);

        if (isLocal) {
            // handle local comment deletion
            removeLocalComment(id);
            setFeedback({
                success: "Comentario eliminado correctamente.",
                error: null,
            });
            setDeletingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        } else {
            // Handle server comment deletion wiht optimistic updates
            markAsDeleted(id);
            setFeedback({
                success: "Comentario eliminado correctamente.",
                error: null,
            });

            try {
                await remove(id);
                // ynvalidate react query cache to refresh paginated comments
                queryClient.invalidateQueries({ queryKey: ["comments"] });
            } catch (error) {
                console.error("Error deleting comment:", error);
                unmarkAsDeleted(id);
                setFeedback({
                    success: null,
                    error: "Error al eliminar el comentario. Inténtalo de nuevo.",
                });
            } finally {
                setDeletingIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
            }
        }
    };

    const handleCommentEdit = (id: number, allComments: Comment[]) => {
        const comment = allComments.find((c) => c.id === id);
        if (comment) {
            setEditingComment(comment);
        }
    };

    const handleEditClose = () => {
        setEditingComment(null);
    };

    const handleEditSuccess = (updatedComment: Comment) => {
        const isLocal = isLocalComment(updatedComment);

        if (isLocal) {
            editLocalComment(updatedComment.id!, updatedComment);
            setFeedback({
                success: "Comentario editado correctamente.",
                error: null,
            });
        } else {
            // aply optimistic update immediately
            markAsEdited(updatedComment.id!, updatedComment);
            setFeedback({
                success: "Comentario editado correctamente.",
                error: null,
            });

            // send to server in bakground
            edit(updatedComment.id!, updatedComment)
                .then(() => {
                    // invalidate React Query cache to refresh paginated comments
                    queryClient.invalidateQueries({ queryKey: ["comments"] });
                })
                .catch((error) => {
                    console.error("Error updating comment:", error);
                    unmarkAsEdited(updatedComment.id!);
                    setFeedback({
                        success: null,
                        error: "Error al editar el comentario. Inténtalo de nuevo.",
                    });
                });
        }

        setEditingComment(null);
    };

    const handleCommentCreated = () => {
        setFeedback({
            success: "Comentario creado correctamente.",
            error: null,
        });
    };

    return {
        handleCommentDelete,
        handleCommentEdit,
        handleEditClose,
        handleEditSuccess,
        handleCommentCreated,
        deletingIds,
        editingComment,
        feedback,
        clearFeedback,
        applyOptimisticUpdates,
    };
};
