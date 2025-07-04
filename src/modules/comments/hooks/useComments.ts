import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentsStore } from "../store/commentsStore";
import { Comment } from "../adapters/CommentsApi";

export function useComments() {
    const {
        comments,
        status,
        isCreating,
        isUpdating,
        isDeleting,
        fetch,
        add,
        edit,
        remove,
        addOptimistic,
        editOptimistic,
        removeOptimistic,
    } = useCommentsStore();
    const queryClient = useQueryClient();

    const { isLoading, isError } = useQuery({
        queryKey: ["comments"],
        queryFn: fetch,
        enabled: false,
    });

    const addMutation = useMutation({
        mutationFn: add,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments"] }),
    });

    const editMutation = useMutation({
        mutationFn: ({
            id,
            comment,
        }: {
            id: number;
            comment: Partial<Comment>;
        }) => edit(id, comment),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments"] }),
    });

    const removeMutation = useMutation({
        mutationFn: remove,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments"] }),
    });

    // Optimistic mutations
    const addOptimisticMutation = useMutation({
        mutationFn: add,
        onMutate: async (newComment) => {
            // Optimistic update
            addOptimistic(newComment);
        },
    });

    const editOptimisticMutation = useMutation({
        mutationFn: ({
            id,
            comment,
        }: {
            id: number;
            comment: Partial<Comment>;
        }) => edit(id, comment),
        onMutate: async ({ id, comment }) => {
            editOptimistic(id, comment);
        },
    });

    const removeOptimisticMutation = useMutation({
        mutationFn: remove,
        onMutate: async (id) => {
            removeOptimistic(id);
        },
    });

    return {
        comments,
        status: isLoading ? "loading" : isError ? "error" : status,
        isCreating,
        isUpdating,
        isDeleting,
        add: addOptimisticMutation.mutateAsync,
        edit: (id: number, comment: Partial<Comment>) =>
            editOptimisticMutation.mutateAsync({ id, comment }),
        remove: removeOptimisticMutation.mutateAsync,
        // Non-optimistic versions if needed
        addSync: addMutation.mutateAsync,
        editSync: (id: number, comment: Partial<Comment>) =>
            editMutation.mutateAsync({ id, comment }),
        removeSync: removeMutation.mutateAsync,
    };
}
