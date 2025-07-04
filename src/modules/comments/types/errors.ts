export class CommentError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly statusCode?: number,
    ) {
        super(message);
        this.name = "CommentError";
    }
}

export class CommentNotFoundError extends CommentError {
    constructor(id: number) {
        super(
            `Comentario con ID ${id} no encontrado`,
            "COMMENT_NOT_FOUND",
            404,
        );
        this.name = "CommentNotFoundError";
    }
}

export class CommentValidationError extends CommentError {
    constructor(message: string) {
        super(message, "VALIDATION_ERROR", 400);
        this.name = "CommentValidationError";
    }
}

export class CommentApiError extends CommentError {
    constructor(message: string, statusCode?: number) {
        super(message, "API_ERROR", statusCode);
        this.name = "CommentApiError";
    }
}

export function isCommentError(error: unknown): error is CommentError {
    return error instanceof CommentError;
}
