import React, { useEffect } from "react";
import { Modal } from "@/GLOBAL/ui/molecules/Modal/Modal";
import { FormComment } from "@/GLOBAL/ui/molecules/FormComment/FormComment";
import { Box } from "@mui/material";
import { useEditComment } from "../hooks/useEditComment";
import { Comment } from "../adapters/CommentsApi";
import { CommentFormAdapter } from "../adapters/CommentFormAdapter";

interface EditCommentModalContainerProps {
    comment: Comment | null;
    open: boolean;
    onClose: () => void;
    onEditSuccess?: (updatedComment: Comment) => void;
}

export const EditCommentModalContainer: React.FC<
    EditCommentModalContainerProps
> = ({ comment, open, onClose, onEditSuccess }) => {
    const { editComment, isUpdating, error, clearError } = useEditComment();
    useEffect(() => {
        if (open) {
            clearError();
        }
    }, [open, clearError]);

    const handleSubmit = async (data: {
        name: string;
        email: string;
        comment: string;
    }) => {
        if (!comment) return;

        try {
            const updatedComment = await editComment(comment, data);
            if (updatedComment && onEditSuccess) {
                onEditSuccess(updatedComment);
            }
            onClose();
        } catch {
            // error is handled by useEditComment hook
        }
    };

    if (!comment) return null;

    return (
        <Modal open={open} onClose={onClose} title="Editar comentario">
            <FormComment
                defaultValues={CommentFormAdapter.apiToForm(comment)}
                onSubmit={handleSubmit}
                isLoading={isUpdating}
            />
            {error && (
                <Box color="error.main" mt={2}>
                    {error}
                </Box>
            )}
        </Modal>
    );
};
