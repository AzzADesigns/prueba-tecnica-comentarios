import { useState } from "react";
import { useComments } from "./useComments";
import { Comment } from "../adapters/CommentsApi";
import {
    CommentFormAdapter,
    CommentFormData,
} from "../adapters/CommentFormAdapter";
import { isCommentError } from "../types/errors";

export function useEditComment() {
    const [error, setError] = useState<string | null>(null);
    const { edit, isUpdating } = useComments();

    const editComment = async (
        comment: Comment,
        formData: CommentFormData,
    ): Promise<Comment | null> => {
        if (!comment?.id) return null;

        setError(null);
        try {
            const apiData = CommentFormAdapter.formToPartialApi(formData);
            const updatedComment = await edit(comment.id, apiData);
            return updatedComment;
        } catch (error: unknown) {
            let errorMessage: string;

            if (isCommentError(error)) {
                errorMessage = error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = "Ocurrió un error al editar el comentario.";
            }

            setError(errorMessage);
            throw error;
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        editComment,
        isUpdating,
        error,
        clearError,
    };
}
