import { Comment } from "../adapters/CommentsApi";

export interface CreateCommentData {
    name: string;
    email: string;
    comment: string;
}

export const createLocalComment = (data: CreateCommentData): Comment => {
    return {
        id: Date.now(),
        name: data.name,
        email: data.email,
        body: data.comment,
        postId: 1,
    };
};

export const isValidComment = (comment: unknown): comment is Comment => {
    return !!(
        comment &&
        typeof comment === "object" &&
        "id" in comment &&
        "name" in comment &&
        "body" in comment &&
        "email" in comment &&
        comment.name &&
        comment.body &&
        comment.email &&
        comment.id
    );
};

export const isLocalComment = (comment: Comment): boolean => {

    return comment.id! > 1000000;
};
