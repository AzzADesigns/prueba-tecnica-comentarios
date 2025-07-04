import { create } from "zustand";
import { Comment } from "../adapters/CommentsApi";

interface OptimisticUpdatesStore {
    deletedIds: Set<number>;
    editedComments: Map<number, Comment>;
    markAsDeleted: (id: number) => void;
    unmarkAsDeleted: (id: number) => void;
    markAsEdited: (id: number, comment: Comment) => void;
    unmarkAsEdited: (id: number) => void;
    applyOptimisticUpdates: (comments: Comment[]) => Comment[];
}

export const useOptimisticUpdatesStore = create<OptimisticUpdatesStore>(
    (set, get) => ({
        deletedIds: new Set(),
        editedComments: new Map(),
        markAsDeleted: (id) =>
            set((state) => ({
                deletedIds: new Set(state.deletedIds).add(id),
            })),
        unmarkAsDeleted: (id) =>
            set((state) => {
                const newSet = new Set(state.deletedIds);
                newSet.delete(id);
                return { deletedIds: newSet };
            }),
        markAsEdited: (id, comment) =>
            set((state) => {
                const newMap = new Map(state.editedComments);
                newMap.set(id, comment);
                return { editedComments: newMap };
            }),
        unmarkAsEdited: (id) =>
            set((state) => {
                const newMap = new Map(state.editedComments);
                newMap.delete(id);
                return { editedComments: newMap };
            }),
        applyOptimisticUpdates: (comments) => {
            const { deletedIds, editedComments } = get();
            return comments
                .filter((c) => !deletedIds.has(c.id!))
                .map((c) => editedComments.get(c.id!) || c);
        },
    }),
);
