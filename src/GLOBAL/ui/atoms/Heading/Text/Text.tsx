import React from 'react';

export type TextVariant = 'h1' | 'h2' | 'p' | 'mail';

export interface TextProps {
    variantType?: TextVariant;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const getTextStyles = (variantType: TextVariant = 'p'): React.CSSProperties => {
    switch (variantType) {
        case 'h1':
            return {
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#000',
                margin: 0,
            };
        case 'h2':
            return {
                fontSize: '1rem',
                fontWeight: 700,
                color: '#171717',
                margin: 0,
            };
        case 'mail':
            return {
                fontSize: '1rem',
                fontWeight: 600,
                color: '#171717',
                margin: 0,
            };
        case 'p':
        default:
            return {
                fontSize: '1rem',
                fontWeight: 400,
                color: '#757575',
                margin: 0,
            };
    }
};

export const Text: React.FC<TextProps> = ({ variantType = 'p', children, style }) => {
    const styles = { ...getTextStyles(variantType), ...style };
    switch (variantType) {
        case 'h1':
            return <h1 style={styles}>{children}</h1>;
        case 'h2':
            return <h2 style={styles}>{children}</h2>;
        case 'mail':
            return <span style={styles}>{children}</span>;
        case 'p':
        default:
            return <p style={styles}>{children}</p>;
    }
}; 