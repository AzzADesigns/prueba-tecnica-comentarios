import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const meta: Meta<typeof Button> = {
    title: 'GLOBAL/ui/atoms/Button',
    component: Button,
    argTypes: {
        variantType: {
            control: 'select',
            options: ['base', 'edit', 'delete', 'create', 'textLink'],
        },
        onClick: { action: 'clicked' },
    },
    args: {
        children: 'Botón',
        variantType: 'base',
    },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
    args: {
        children: 'Base',
        variantType: 'base',
    },
};

export const Edit: Story = {
    args: {
        children: (<><EditIcon sx={{ mr: 1 }} />Editar</>),
        variantType: 'edit',
    },
};

export const Delete: Story = {
    args: {
        children: (<><DeleteIcon sx={{ mr: 1 }} />Eliminar</>),
        variantType: 'delete',
    },
};

export const Create: Story = {
    args: {
        children: (<>Crear comentario <AddCircleOutlineIcon sx={{ ml: 1 }} /></>),
        variantType: 'create',
    },
};

export const TextLink: Story = {
    args: {
        children: 'ver más',
        variantType: 'textLink',
    },
};

export const Comment: Story = {
    args: {
        children: 'Comentar',
        variantType: 'comment',
    },
}; 