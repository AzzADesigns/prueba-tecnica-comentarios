import React from 'react';
import { Box, Stack } from '@mui/material';
import { Input } from '../../atoms/input/Input';
import { TextArea } from '../../atoms/textArea/TextArea';
import { Button } from '../../atoms/Button/Button';

export interface FormCommentProps {
    name?: string;
    email?: string;
    comment?: string;
    errorName?: boolean;
    errorEmail?: boolean;
    errorComment?: boolean;
    helperName?: string;
    helperEmail?: string;
    helperComment?: string;
    onChangeName?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeEmail?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeComment?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormComment: React.FC<FormCommentProps> = ({
    name = '',
    email = '',
    comment = '',
    errorName = false,
    errorEmail = false,
    errorComment = false,
    helperName,
    helperEmail,
    helperComment,
    onChangeName,
    onChangeEmail,
    onChangeComment,
    onSubmit,
}) => {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ p: 2, maxWidth: 400, background: '#fff', borderRadius: 2, boxShadow: '0 2px 8px #eee' }}>
            <Stack spacing={2}>
                <Input
                    label="Nombre"
                    placeholder="Escribe tu nombre"
                    value={name}
                    onChange={onChangeName}
                    error={errorName}
                    helperText={helperName}
                />
                <Input
                    label="Email"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={onChangeEmail}
                    error={errorEmail}
                    helperText={helperEmail}
                />
                <TextArea
                    label="Comentario"
                    placeholder="Escribe tu comentario..."
                    value={comment}
                    onChange={onChangeComment}
                    error={errorComment}
                    helperText={helperComment}
                />
                <Button variantType="comment" type="submit" fullWidth>
                    Comentar
                </Button>
            </Stack>
        </Box>
    );
};
