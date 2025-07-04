'use client';

import React, { useRef, useState, useEffect } from 'react';
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
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            setShowButton(textRef.current.scrollHeight > textRef.current.clientHeight);
        }
    }, [body]);

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
                transition: 'max-height 0.3s cubic-bezier(.4,0,.2,1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >      
            <div className='h-13'>
                <Text variantType="h2">{title}</Text>
            </div>
            <div
                ref={textRef}
                style={{
                    maxHeight: expanded ? 500 : 72,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s cubic-bezier(.4,0,.2,1)',
                    display: '-webkit-box',
                    WebkitLineClamp: expanded ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                }}
                className=''
            >
                <Text variantType="p">{body}</Text>
            </div>
            {showButton && !expanded && (
                <Button variantType="textLink" onClick={() => setExpanded(true)}>
                    ver más
                </Button>
            )}
            {expanded && (
                <Button variantType="textLink" onClick={() => setExpanded(false)}>
                    ver menos
                </Button>
            )}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    justifyContent: 'flex-end',
                    marginTop: 'auto',
                }}
            >
                <Text variantType="mail">{email}</Text>
                <Stack direction="row" spacing={1}>
                    <Button variantType="delete" onClick={onDelete} aria-label="Eliminar">
                        <DeleteIcon />
                    </Button>
                    <Button variantType="edit" onClick={onEdit} aria-label="Editar">
                        <EditIcon />
                    </Button>
                </Stack>
            </div>
        </Box>
    );
};
