import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { commentsApi, Comment } from '../adapters/CommentsApi';

const PAGE_SIZE = 10;

const fetchCommentsPage = async (page: number): Promise<Comment[]> => {
    const all = await commentsApi.list();
    return all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
};

export function usePaginatedComments() {
    const [page, setPage] = useState(1);
    const [allComments, setAllComments] = useState<Comment[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const {
        data: comments,
        isLoading,
        isError,
        isFetching,
    } = useQuery<Comment[], Error>({
        queryKey: ['comments', page],
        queryFn: () => fetchCommentsPage(page),
    });

    useEffect(() => {
        if (comments) {
            setAllComments((prev) => {
                const ids = new Set(prev.map((c: Comment) => c.id));
                return [...prev, ...comments.filter((c: Comment) => !ids.has(c.id))];
            });
            setHasMore(comments.length === PAGE_SIZE);
        }
    }, [comments]);

    return {
        page,
        setPage,
        allComments,
        isLoading,
        isError,
        isFetching,
        hasMore,
    };
} 