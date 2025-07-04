import React from "react";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

export type TextAreaVariant = "base" | "error";

export interface TextAreaProps
    extends Omit<TextFieldProps, "variant" | "multiline"> {
    variantType?: TextAreaVariant;
}

const getTextAreaStyles = (variantType: TextAreaVariant = "base") => {
    switch (variantType) {
        case "error":
            return {
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#c62828",
                    },
                    "&:hover fieldset": {
                        borderColor: "#c62828",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#c62828",
                    },
                },
            };
        case "base":
        default:
            return {
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "#bdbdbd",
                    },
                    "&:hover fieldset": {
                        borderColor: "#757575",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#171717",
                    },
                },
            };
    }
};

export const TextArea: React.FC<TextAreaProps> = ({
    variantType = "base",
    error,
    ...props
}) => {
    const isError = Boolean(error);
    return (
        <MuiTextField
            variant="outlined"
            multiline
            minRows={4}
            sx={getTextAreaStyles(isError ? "error" : variantType)}
            error={isError}
            {...props}
        />
    );
};
