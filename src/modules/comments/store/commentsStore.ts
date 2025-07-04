import { create } from "zustand";
import { commentsApi, Comment } from "../adapters/CommentsApi";

export type CommentsStatus = "idle" | "loading" | "success" | "error";

interface CommentsStore {
    comments: Comment[];
    status: CommentsStatus;
    error: string | null;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    fetch: () => Promise<Comment[]>;
    add: (comment: Omit<Comment, "id">) => Promise<void>;
    edit: (id: number, comment: Partial<Comment>) => Promise<Comment>;
    remove: (id: number) => Promise<void>;
    // Optimistic updates
    addOptimistic: (comment: Omit<Comment, "id">) => void;
    editOptimistic: (id: number, data: Partial<Comment>) => void;
    removeOptimistic: (id: number) => void;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
    comments: [],
    status: "idle",
    error: null,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    fetch: async () => {
        set({ status: "loading", error: null });
        try {
            const data = await commentsApi.list();
            set({ comments: data, status: "success" });
            return data;
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al cargar comentarios");
            set({ status: "error", error: error.message });
            throw error;
        }
    },
    add: async (comment) => {
        set({ isCreating: true, error: null });
        try {
            const newComment: Comment = await commentsApi.create(comment);
            set((state) => ({
                comments: [newComment, ...state.comments],
                isCreating: false,
            }));
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al agregar comentario");
            set({ isCreating: false, error: error.message });
        }
    },
    edit: async (id, comment) => {
        set({ isUpdating: true, error: null });
        try {
            const updated: Comment = await commentsApi.update(id, comment);
            set((state) => ({
                comments: state.comments.map((c) =>
                    c.id === id ? { ...c, ...updated } : c,
                ),
                isUpdating: false,
            }));
            return updated;
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al editar comentario");
            set({ isUpdating: false, error: error.message });
            throw error;
        }
    },
    remove: async (id) => {
        set({ isDeleting: true, error: null });
        try {
            await commentsApi.remove(id);
            set((state) => ({
                comments: state.comments.filter((c) => c.id !== id),
                isDeleting: false,
            }));
        } catch (err: unknown) {
            const error =
                err instanceof Error
                    ? err
                    : new Error("Error desconocido al eliminar comentario");
            set({ isDeleting: false, error: error.message });
        }
    },
    // Optimistic updates
    addOptimistic: (comment) => {
        const optimisticComment: Comment = {
            ...comment,
            id: Math.floor(Math.random() * 1000000),
            postId: 1,
        };
        set((state) => ({
            comments: [optimisticComment, ...state.comments],
        }));
    },
    editOptimistic: (id, data) => {
        set((state) => ({
            comments: state.comments.map((c) =>
                c.id === id ? { ...c, ...data } : c,
            ),
        }));
    },
    removeOptimistic: (id) => {
        set((state) => ({
            comments: state.comments.filter((c) => c.id !== id),
        }));
    },
}));
