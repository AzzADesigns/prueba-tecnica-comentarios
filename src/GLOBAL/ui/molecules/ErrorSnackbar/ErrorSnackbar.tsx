import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

export interface ErrorSnackbarProps {
    open: boolean;
    message: string;
    severity?: AlertColor;
    onClose: () => void;
    autoHideDuration?: number;
}

export const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
    open,
    message,
    severity = "error",
    onClose,
    autoHideDuration = 6000,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
