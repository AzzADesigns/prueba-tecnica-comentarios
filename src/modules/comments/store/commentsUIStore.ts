import { create } from "zustand";

export type CommentsStatus = "idle" | "loading" | "success" | "error";

interface CommentsUIStore {
    status: CommentsStatus;
    error: string | null;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    setStatus: (status: CommentsStatus) => void;
    setError: (error: string | null) => void;
    setCreating: (isCreating: boolean) => void;
    setUpdating: (isUpdating: boolean) => void;
    setDeleting: (isDeleting: boolean) => void;
    clearError: () => void;
}

export const useCommentsUIStore = create<CommentsUIStore>((set) => ({
    status: "idle",
    error: null,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    setStatus: (status) => set({ status }),
    setError: (error) => set({ error }),
    setCreating: (isCreating) => set({ isCreating }),
    setUpdating: (isUpdating) => set({ isUpdating }),
    setDeleting: (isDeleting) => set({ isDeleting }),
    clearError: () => set({ error: null }),
}));
