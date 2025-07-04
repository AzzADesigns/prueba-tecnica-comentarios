import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import { Button } from "../../atoms/Button/Button";

export interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "delete" | "edit" | "create" | "base";
    isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title = "Confirmar acción",
    message = "¿Estás seguro de que quieres realizar esta acción?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmVariant = "delete",
    isLoading = false,
}) => {
    const handleConfirm = () => {
        if (!isLoading) {
            onConfirm();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
            <DialogContent dividers>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button
                    variantType="textLink"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    {cancelText}
                </Button>
                <Button
                    variantType={confirmVariant}
                    onClick={handleConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? "Procesando..." : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
