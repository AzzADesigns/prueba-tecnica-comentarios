import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Modal> = {
    title: 'GLOBAL/ui/molecules/Modal',
    component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button variantType="base" onClick={() => setOpen(true)}>
                    Abrir Modal
                </Button>
                <Modal open={open} onClose={() => setOpen(false)} title="Modal de ejemplo">
                    <div style={{ padding: 24 }}>Este es el contenido del modal.</div>
                </Modal>
            </>
        );
    },
};

export const WithForm: Story = {
    render: () => {
        const [open, setOpen] = useState(true);
        return (
            <>
                <Button variantType="base" onClick={() => setOpen(true)}>
                    Abrir Modal con Formulario
                </Button>
                <Modal open={open} onClose={() => setOpen(false)} title="Formulario">
                    <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <input placeholder="Nombre" />
                        <input placeholder="Email" />
                        <textarea placeholder="Comentario" />
                        <Button variantType="comment" type="submit">Enviar</Button>
                    </form>
                </Modal>
            </>
        );
    },
}; 