import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/comments";

export interface Comment {
    postId?: number;
    id?: number;
    name: string;
    email: string;
    body: string;
}

export const commentsApi = {
    list: async (): Promise<Comment[]> => {
        const { data } = await axios.get(BASE_URL);
        return data;
    },
    create: async (comment: Omit<Comment, "id">): Promise<Comment> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newComment: Comment = {
            ...comment,
            id: Math.floor(Math.random() * 1000000),
            postId: 1, 
        };
        return newComment;
    },
    update: async (id: number, comment: Partial<Comment>): Promise<Comment> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const updatedComment: Comment = {
            id,
            postId: 1,
            name: comment.name || "",
            email: comment.email || "",
            body: comment.body || "",
            ...comment,
        };
        return updatedComment;
    },
    remove: async (): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 500));

    },
};
