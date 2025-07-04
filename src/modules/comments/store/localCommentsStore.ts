import { create } from "zustand";
import { Comment } from "../adapters/CommentsApi";
import { isValidComment } from "../utils/commentUtils";

interface LocalCommentsStore {
    localComments: Comment[];
    addLocalComment: (comment: Comment) => void;
    editLocalComment: (id: number, updatedComment: Partial<Comment>) => void;
    removeLocalComment: (id: number) => void;
    clearLocalComments: () => void;
}

export const useLocalCommentsStore = create<LocalCommentsStore>((set) => ({
    localComments: [],
    addLocalComment: (comment) =>
        set((state) => {
            if (!isValidComment(comment)) {
                console.warn(
                    "Intento de agregar comentario incompleto:",
                    comment,
                );
                return state;
            }
            return {
                localComments: [comment, ...state.localComments],
            };
        }),
    editLocalComment: (id, updatedComment) =>
        set((state) => ({
            localComments: state.localComments.map((comment) =>
                comment.id === id ? { ...comment, ...updatedComment } : comment,
            ),
        })),
    removeLocalComment: (id) =>
        set((state) => ({
            localComments: state.localComments.filter(
                (comment) => comment.id !== id,
            ),
        })),
    clearLocalComments: () => set({ localComments: [] }),
}));
