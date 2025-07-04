import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

interface FeedbackSnackbarProps {
    open: boolean;
    message: string;
    severity?: AlertColor;
    onClose: () => void;
}

export const FeedbackSnackbar: React.FC<FeedbackSnackbarProps> = ({
    open,
    message,
    severity = "success",
    onClose,
}) => (
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
        <MuiAlert
            elevation={6}
            variant="filled"
            onClose={onClose}
            severity={severity}
        >
            {message}
        </MuiAlert>
    </Snackbar>
);
