import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
    title: "GLOBAL/ui/atoms/Input",
    component: Input,
    argTypes: {
        variantType: {
            control: "select",
            options: ["base", "selected", "error"],
        },
        error: {
            control: "boolean",
        },
    },
    args: {
        label: "Nombre",
        placeholder: "Escribe tu nombre",
        variantType: "base",
        error: false,
    },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Base: Story = {};

export const Selected: Story = {
    args: {
        variantType: "selected",
        error: false,
    },
};

export const ErrorByProp: Story = {
    args: {
        variantType: "base",
        error: true,
        helperText: "Este campo es obligatorio",
    },
};

export const WithPlaceholder: Story = {
    args: {
        label: "Correo electrónico",
        placeholder: "ejemplo@correo.com",
        variantType: "base",
        error: false,
    },
};
