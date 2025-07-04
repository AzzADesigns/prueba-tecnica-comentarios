import { create } from "zustand";
import { commentsApi, Comment } from "../adapters/CommentsApi";

interface CommentsDataStore {
    comments: Comment[];
    fetch: () => Promise<Comment[]>;
    add: (comment: Omit<Comment, "id">) => Promise<void>;
    edit: (id: number, comment: Partial<Comment>) => Promise<Comment>;
    remove: (id: number) => Promise<void>;
}

export const useCommentsDataStore = create<CommentsDataStore>((set) => ({
    comments: [],
    fetch: async () => {
        try {
            const data = await commentsApi.list();
            set({ comments: data });
            return data;
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al cargar comentarios");
            throw error;
        }
    },
    add: async (comment) => {
        try {
            const newComment: Comment = await commentsApi.create(comment);
            set((state) => ({
                comments: [newComment, ...state.comments],
            }));
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al crear comentario");
            throw error;
        }
    },
    edit: async (id, comment) => {
        try {
            const updated: Comment = await commentsApi.update(id, comment);
            set((state) => ({
                comments: state.comments.map((c) =>
                    c.id === id ? { ...c, ...updated } : c,
                ),
            }));
            return updated;
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al editar comentario");
            throw error;
        }
    },
    remove: async (id) => {
        try {
            await commentsApi.remove(id);
            set((state) => ({
                comments: state.comments.filter((c) => c.id !== id),
            }));
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al eliminar comentario");
            throw error;
        }
    },
}));
