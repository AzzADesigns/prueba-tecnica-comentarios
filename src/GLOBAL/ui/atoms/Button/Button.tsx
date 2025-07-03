import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type CustomVariant = 'base' | 'edit' | 'delete' | 'create' | 'textLink' | 'comment';

export interface ButtonProps extends MuiButtonProps {
    variantType?: CustomVariant;
    children?: React.ReactNode;
}

const getButtonStyles = (variantType: CustomVariant = 'base') => {
    switch (variantType) {
        case 'edit':
            return {
                backgroundColor: '#e3f2fd',
                color: '#1565c0',
                border: '2px solid #90caf9',
                '&:hover': {
                    backgroundColor: '#bbdefb',
                    borderColor: '#42a5f5',
                },
            };
        case 'delete':
            return {
                backgroundColor: '#ffebee', 
                color: '#c62828', 
                border: '2px solid #ef9a9a',
                '&:hover': {
                    backgroundColor: '#ffcdd2',
                    borderColor: '#e57373',
                },
            };
        case 'create':
            return {
                backgroundColor: '#171717',
                color: '#ffffff',
                border: '2px solid var(--color-primary)',
                '&:hover': {
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)',
                    borderColor: 'var(--color-primary)',
                },
            };
        case 'textLink':
            return {
                backgroundColor: 'transparent',
                color: '#757575',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                padding: 0,
                minWidth: 0,
                textDecoration: 'none',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#171717',
                    textDecoration: 'underline',
                },
            };
        case 'comment':
            return getButtonStyles('base');
        case 'base':
        default:
            return {
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                border: '2px solid #171717',
                '&:hover': {
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)',
                    borderColor: 'var(--color-primary)',
                },
            };
    }
};

export const Button: React.FC<ButtonProps> = ({ variantType = 'base', children, ...props }) => {
    return (
        <MuiButton
            variant={variantType === 'textLink' ? 'text' : 'contained'}
            disableRipple={variantType === 'textLink'}
            sx={{
                borderRadius: variantType === 'textLink' ? 0 : '10px',
                fontWeight: 500,
                textTransform: 'none',
                boxShadow: 'none',
                ...getButtonStyles(variantType),
                ...props.sx,
            }}
            {...props}
        >
            {children}
        </MuiButton>
    );
}; 