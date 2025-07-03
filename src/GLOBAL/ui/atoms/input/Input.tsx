import React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export type InputVariant = 'base' | 'selected' | 'error';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
    variantType?: InputVariant;
    label?: string;
}

const getInputStyles = (variantType: InputVariant = 'base') => {
    switch (variantType) {
        case 'selected':
            return {
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#1565c0',
                    },
                    '&:hover fieldset': {
                        borderColor: '#1565c0',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#1565c0',
                    },
                },
            };
        case 'error':
            return {
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#c62828', 
                    },
                    '&:hover fieldset': {
                        borderColor: '#c62828',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#c62828',
                    },
                },
            };
        case 'base':
        default:
            return {
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#bdbdbd',
                    },
                    '&:hover fieldset': {
                        borderColor: '#757575',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#171717',
                    },
                },
            };
    }
};

export const Input: React.FC<InputProps> = ({ variantType = 'base', error, label, ...props }) => {
    const isError = Boolean(error);
    return (
        <MuiTextField
            variant="outlined"
            label={label}
            sx={getInputStyles(isError ? 'error' : variantType)}
            error={isError}
            {...props}
        />
    );
};
