import type { Meta, StoryObj } from "@storybook/react";
import { ErrorSnackbar } from "./ErrorSnackbar";

const meta: Meta<typeof ErrorSnackbar> = {
    title: "GLOBAL/ui/molecules/ErrorSnackbar",
    component: ErrorSnackbar,
    argTypes: {
        severity: {
            control: "select",
            options: ["error", "warning", "info", "success"],
        },
        autoHideDuration: {
            control: "number",
        },
    },
    args: {
        open: true,
        message: "Este es un mensaje de error de ejemplo",
        severity: "error",
        autoHideDuration: 6000,
    },
};
export default meta;
type Story = StoryObj<typeof ErrorSnackbar>;

export const Error: Story = {
    args: {
        message: "Error al eliminar el comentario",
        severity: "error",
    },
};

export const Warning: Story = {
    args: {
        message: "Advertencia: Este comentario será eliminado",
        severity: "warning",
    },
};

export const Success: Story = {
    args: {
        message: "Comentario eliminado exitosamente",
        severity: "success",
    },
};

export const Info: Story = {
    args: {
        message: "Información: Los cambios se guardarán automáticamente",
        severity: "info",
    },
};
