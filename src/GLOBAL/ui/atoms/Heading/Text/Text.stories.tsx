import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
    title: 'GLOBAL/ui/atoms/Heading/Text',
    component: Text,
    argTypes: {
        variantType: {
            control: 'select',
            options: ['h1', 'h2', 'p', 'mail'],
        },
    },
    args: {
        children: 'Texto de ejemplo',
        variantType: 'p',
    },
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Heading1: Story = {
    args: {
        children: 'Lista de Comentarios',
        variantType: 'h1',
    },
};

export const Heading2: Story = {
    args: {
        children: 'id labore ex et quam laborum',
        variantType: 'h2',
    },
};

export const Paragraph: Story = {
    args: {
        children: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem.... ver más',
        variantType: 'p',
    },
};

export const Mail: Story = {
    args: {
        children: 'Eliseo@gardner.biz',
        variantType: 'mail',
    },
}; 