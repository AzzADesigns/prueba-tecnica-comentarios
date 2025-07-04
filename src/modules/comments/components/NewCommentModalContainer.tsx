import React, { useState } from "react";
import { Modal } from "@/GLOBAL/ui/molecules/Modal/Modal";
import { FormComment } from "@/GLOBAL/ui/molecules/FormComment/FormComment";
import { Button } from "@/GLOBAL/ui/atoms/Button/Button";
import { Box } from "@mui/material";
import { useComments } from "../hooks/useComments";
import { useLocalCommentsStore } from "../store/localCommentsStore";
import { createLocalComment } from "../utils/commentUtils";

interface NewCommentModalContainerProps {
    onCommentCreated?: () => void;
}

export const NewCommentModalContainer: React.FC<
    NewCommentModalContainerProps
> = ({ onCommentCreated }) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { add, isCreating } = useComments();
    const { addLocalComment } = useLocalCommentsStore();

    const handleOpen = () => {
        setOpen(true);
        setError(null);
    };
    const handleClose = () => {
        setOpen(false);
        setError(null);
    };

    const handleSubmit = async (data: {
        name: string;
        email: string;
        comment: string;
    }) => {
        setError(null);
        try {
            const localComment = createLocalComment(data);
            addLocalComment(localComment);
            await add({
                name: data.name,
                email: data.email,
                body: data.comment,
            });
            setOpen(false);
            onCommentCreated?.();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Ocurrió un error al enviar el comentario.";
            setError(errorMessage);
        }
    };

    return (
        <Box mb={2}>
            <Button variantType="create" onClick={handleOpen}>
                Nuevo comentario
            </Button>
            <Modal open={open} onClose={handleClose} title="Nuevo comentario">
                <FormComment onSubmit={handleSubmit} isLoading={isCreating} />
                {error && (
                    <Box color="error.main" mt={2}>
                        {error}
                    </Box>
                )}
            </Modal>
        </Box>
    );
};
