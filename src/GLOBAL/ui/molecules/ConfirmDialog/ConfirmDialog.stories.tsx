import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "./ConfirmDialog";

const meta: Meta<typeof ConfirmDialog> = {
    title: "GLOBAL/ui/molecules/ConfirmDialog",
    component: ConfirmDialog,
    args: {
        open: true,
        onClose: () => alert("Cerrar diálogo"),
        onConfirm: () => alert("Confirmado!"),
        title: "¿Estás seguro?",
        message: "Esta acción no se puede deshacer.",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        isLoading: false,
    },
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Delete: Story = {
    args: {
        confirmVariant: "delete",
        title: "Eliminar comentario",
        message: "¿Estás seguro de que quieres eliminar este comentario?",
        confirmText: "Eliminar",
    },
};

export const Edit: Story = {
    args: {
        confirmVariant: "edit",
        title: "Editar comentario",
        message: "¿Deseas guardar los cambios?",
        confirmText: "Guardar",
    },
};

export const Create: Story = {
    args: {
        confirmVariant: "create",
        title: "Crear comentario",
        message: "¿Deseas crear este comentario?",
        confirmText: "Crear",
    },
};

export const Base: Story = {
    args: {
        confirmVariant: "base",
        title: "Acción base",
        message: "¿Deseas continuar?",
        confirmText: "Continuar",
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
        confirmVariant: "delete",
        title: "Eliminando...",
        message: "Por favor espera.",
        confirmText: "Eliminando",
    },
};
