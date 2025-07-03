import type { Meta, StoryObj } from '@storybook/react';
import { FormComment } from './FormComment';

const meta: Meta<typeof FormComment> = {
    title: 'GLOBAL/ui/molecules/FormComment',
    component: FormComment,
    args: {
        name: '',
        email: '',
        comment: '',
        errorName: false,
        errorEmail: false,
        errorComment: false,
        helperName: '',
        helperEmail: '',
        helperComment: '',
    },
};
export default meta;
type Story = StoryObj<typeof FormComment>;

export const Default: Story = {}; 