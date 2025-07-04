import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
    title: "GLOBAL/ui/atoms/TextArea",
    component: TextArea,
    argTypes: {
        variantType: {
            control: "select",
            options: ["base", "error"],
        },
        error: {
            control: "boolean",
        },
    },
    args: {
        label: "Comentario",
        placeholder: "Escribe tu comentario...",
        variantType: "base",
        error: false,
    },
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Base: Story = {};

export const Error: Story = {
    args: {
        error: true,
        helperText: "Este campo es obligatorio",
    },
};
