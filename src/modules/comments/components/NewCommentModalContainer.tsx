import React, { useState } from 'react';
import { Modal } from '@/GLOBAL/ui/molecules/Modal/Modal';
import { FormComment } from '@/GLOBAL/ui/molecules/FormComment/FormComment';
import { Button } from '@/GLOBAL/ui/atoms/Button/Button';
import { Box } from '@mui/material';
import { Comment } from '../adapters/CommentsApi';

interface NewCommentModalContainerProps {
    onCommentCreated?: (comment: Comment) => void;
}

export const NewCommentModalContainer: React.FC<NewCommentModalContainerProps> = ({ onCommentCreated }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOpen = () => {
        setOpen(true);
        setError(null);
    };
    const handleClose = () => {
        setOpen(false);
        setError(null);
    };

    const handleSubmit = async (data: { name: string; email: string; comment: string }) => {
        setIsLoading(true);
        setError(null);
        try {
            // Simula un envío exitoso (reemplaza por tu lógica real de API)
            await new Promise((res) => setTimeout(res, 1000));
            const newComment: Comment = {
                id: Math.floor(Math.random() * 1000000),
                name: data.name,
                email: data.email,
                body: data.comment,
            };
            if (onCommentCreated) onCommentCreated(newComment);
            setOpen(false);
        } catch (e) {
            setError('Ocurrió un error al enviar el comentario.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box mb={2}>
            <Button variantType="create" onClick={handleOpen}>
                Nuevo comentario
            </Button>
            <Modal open={open} onClose={handleClose} title="Nuevo comentario">
                <FormComment
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
                {error && <Box color="error.main" mt={2}>{error}</Box>}
            </Modal>
        </Box>
    );
}; 