import { Comment } from "./CommentsApi";
import { CommentValidationError } from "../types/errors";

export interface CommentFormData {
    name: string;
    email: string;
    comment: string;
}

export interface CommentApiData {
    name: string;
    email: string;
    body: string;
}

export class CommentFormAdapter {
    static formToApi(formData: CommentFormData): CommentApiData {
        if (!formData.name.trim()) {
            throw new CommentValidationError("El nombre es requerido");
        }
        if (!formData.email.trim()) {
            throw new CommentValidationError("El email es requerido");
        }
        if (!formData.comment.trim()) {
            throw new CommentValidationError("El comentario es requerido");
        }

        return {
            name: formData.name.trim(),
            email: formData.email.trim(),
            body: formData.comment.trim(),
        };
    }

    static apiToForm(comment: Comment): CommentFormData {
        return {
            name: comment.name,
            email: comment.email,
            comment: comment.body,
        };
    }

    static formToPartialApi(formData: CommentFormData): Partial<Comment> {
        const result: Partial<Comment> = {};
        if (formData.name.trim()) {
            result.name = formData.name.trim();
        }
        if (formData.email.trim()) {
            result.email = formData.email.trim();
        }
        if (formData.comment.trim()) {
            result.body = formData.comment.trim();
        }
        return result;
    }
}
