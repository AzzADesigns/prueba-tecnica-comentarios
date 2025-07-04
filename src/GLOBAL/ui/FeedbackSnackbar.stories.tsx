import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackSnackbar } from "./FeedbackSnackbar";

const meta: Meta<typeof FeedbackSnackbar> = {
    title: "UI/FeedbackSnackbar",
    component: FeedbackSnackbar,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        severity: {
            control: { type: "select" },
            options: ["success", "error", "warning", "info"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        open: true,
        message: "Comentario creado correctamente.",
        severity: "success",
        onClose: () => {},
    },
};

export const Error: Story = {
    args: {
        open: true,
        message: "Error al eliminar el comentario. Inténtalo de nuevo.",
        severity: "error",
        onClose: () => {},
    },
};

export const Warning: Story = {
    args: {
        open: true,
        message: "El comentario se está procesando.",
        severity: "warning",
        onClose: () => {},
    },
};

export const Info: Story = {
    args: {
        open: true,
        message: "Información del sistema.",
        severity: "info",
        onClose: () => {},
    },
};
