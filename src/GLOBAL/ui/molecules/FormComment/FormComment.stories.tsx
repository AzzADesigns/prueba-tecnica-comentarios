import type { Meta, StoryObj } from '@storybook/react';
import { FormComment } from './FormComment';
import { useState } from 'react';

const meta: Meta<typeof FormComment> = {
    title: 'GLOBAL/ui/molecules/FormComment',
    component: FormComment,
    argTypes: {
        isLoading: { control: 'boolean' },
    },
};
export default meta;
type Story = StoryObj<typeof FormComment>;

export const Initial: Story = {
    args: {
        defaultValues: {},
        isLoading: false,
        onSubmit: (data) => alert('Enviado: ' + JSON.stringify(data)),
    },
};

export const Submitting: Story = {
    args: {
        defaultValues: {},
        isLoading: true,
        onSubmit: () => {},
    },
};

export const Success: Story = {
    render: (args) => {
        const [submitted, setSubmitted] = useState(false);
        return submitted ? (
            <div style={{ padding: 24, background: '#e0ffe0', borderRadius: 8 }}>¡Comentario enviado con éxito!</div>
        ) : (
            <FormComment
                {...args}
                onSubmit={() => setSubmitted(true)}
            />
        );
    },
    args: {
        defaultValues: {},
        isLoading: false,
    },
};

export const Error: Story = {
    render: (args) => (
        <FormComment
            {...args}
            defaultValues={{ name: '', email: 'no-es-un-email', comment: '' }}
            onSubmit={() => {}}
        />
    ),
    args: {
        isLoading: false,
    },
}; 