import React from 'react';
import { Box, Stack } from '@mui/material';

import { Button } from '../../atoms/Button/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Text } from '../../atoms/Heading/Text/Text';

export interface CommentCardProps {
    title: string;
    body: string;
    email: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const CommentCard: React.FC<CommentCardProps> = ({
    title,
    body,
    email,
    onEdit,
    onDelete,
}) => {
    return (
        <Box
            sx={{
                border: '2px solid #424242',
                borderRadius: '14px',
                padding: 2,
                background: '#fff',
                minWidth: 320,
                maxWidth: 360,
                boxShadow: '2px 4px 0 #bdbdbd',
            }}
        >
            <Text variantType="h2">{title}</Text>
            <Text variantType="p">
                {body}
                <Button variantType="textLink">
                    ver más
                </Button>
            </Text>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                <Text variantType="mail">{email}</Text>
                <Stack direction="row" spacing={1}>
                    <Button variantType="delete" onClick={onDelete} aria-label="Eliminar">
                        <DeleteIcon />
                    </Button>
                    <Button variantType="edit" onClick={onEdit} aria-label="Editar">
                        <EditIcon />
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

