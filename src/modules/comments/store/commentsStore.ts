import { create } from 'zustand';
import { commentsApi, Comment } from '../adapters/CommentsApi';

export type CommentsStatus = 'idle' | 'loading' | 'success' | 'error';

interface CommentsStore {
    comments: Comment[];
    status: CommentsStatus;
    error: string | null;
    fetch: () => Promise<void>;
    add: (comment: Omit<Comment, 'id'>) => Promise<void>;
    edit: (id: number, comment: Partial<Comment>) => Promise<void>;
    remove: (id: number) => Promise<void>;
}

export const useCommentsStore = create<CommentsStore>((set) => ({
    comments: [],
    status: 'idle',
    error: null,
    fetch: async () => {
        set({ status: 'loading', error: null });
        try {
            const data = await commentsApi.list();
            set({ comments: data, status: 'success' });
        } catch (err: any) {
            set({ status: 'error', error: err.message || 'Error al cargar comentarios' });
        }
    },
    add: async (comment) => {
        set({ status: 'loading', error: null });
        try {
            const newComment: Comment = await commentsApi.create(comment);
            set((state) => ({
                comments: [newComment, ...state.comments],
                status: 'success',
            }));
        } catch (err: any) {
            set({ status: 'error', error: err.message || 'Error al agregar comentario' });
        }
    },
    edit: async (id, comment) => {
        set({ status: 'loading', error: null });
        try {
            const updated: Comment = await commentsApi.update(id, comment);
            set((state) => ({
                comments: state.comments.map((c) => (c.id === id ? { ...c, ...updated } : c)),
                status: 'success',
            }));
        } catch (err: any) {
            set({ status: 'error', error: err.message || 'Error al editar comentario' });
        }
    },
    remove: async (id) => {
        set({ status: 'loading', error: null });
        try {
            await commentsApi.remove(id);
            set((state) => ({
                comments: state.comments.filter((c) => c.id !== id),
                status: 'success',
            }));
        } catch (err: any) {
            set({ status: 'error', error: err.message || 'Error al eliminar comentario' });
        }
    },
})); 