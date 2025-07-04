import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {title && (
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {title}
                    <IconButton aria-label="close" onClick={onClose} sx={{ ml: 2 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
            )}
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
}; 