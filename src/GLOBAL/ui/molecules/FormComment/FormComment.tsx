import React from "react";
import { Box, Stack } from "@mui/material";
import { Input } from "../../atoms/input/Input";
import { TextArea } from "../../atoms/textArea/TextArea";
import { Button } from "../../atoms/Button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const commentSchema = z.object({
    name: z.string().min(2, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    comment: z.string().min(5, "El comentario es requerido"),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export interface FormCommentProps {
    defaultValues?: Partial<CommentFormValues>;
    onSubmit: (data: CommentFormValues) => void;
    isLoading?: boolean;
}

export const FormComment: React.FC<FormCommentProps> = ({
    defaultValues = {},
    onSubmit,
    isLoading = false,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            name: defaultValues.name || "",
            email: defaultValues.email || "",
            comment: defaultValues.comment || "",
        },
    });

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 2,
                maxWidth: 400,
                background: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 8px #eee",
            }}
        >
            <Stack spacing={2}>
                <Input
                    label="Nombre"
                    placeholder="Escribe tu nombre"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isLoading}
                />
                <Input
                    label="Email"
                    placeholder="ejemplo@correo.com"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isLoading}
                />
                <TextArea
                    label="Comentario"
                    placeholder="Escribe tu comentario..."
                    {...register("comment")}
                    error={!!errors.comment}
                    helperText={errors.comment?.message}
                    disabled={isLoading}
                />
                <Button
                    variantType="comment"
                    type="submit"
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? "Enviando..." : "Comentar"}
                </Button>
            </Stack>
        </Box>
    );
};
