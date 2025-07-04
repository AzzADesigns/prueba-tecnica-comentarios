import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCommentsStore } from '../store/commentsStore';
import { Comment } from '../adapters/CommentsApi';

export function useComments() {
    const { comments, status, fetch, add, edit, remove } = useCommentsStore();
    const queryClient = useQueryClient();

    const { isLoading, isError, refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: fetch,
        enabled: comments.length === 0,
    });

    const addMutation = useMutation({
        mutationFn: add,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
    });
    const editMutation = useMutation({
        mutationFn: ({ id, comment }: { id: number; comment: Partial<Comment> }) => edit(id, comment),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
    });
    const removeMutation = useMutation({
        mutationFn: remove,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] }),
    });

    useEffect(() => {
        if (comments.length === 0) refetch();
    }, [comments.length, refetch]);

    return {
        comments,
        status: isLoading ? 'loading' : isError ? 'error' : status,
        add: addMutation.mutateAsync,
        edit: (id: number, comment: Partial<Comment>) => editMutation.mutateAsync({ id, comment }),
        remove: removeMutation.mutateAsync,
    };
} 