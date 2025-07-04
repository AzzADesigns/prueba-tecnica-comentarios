"use client";
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { CommentGrid } from '../components/CommentGrid';
import { usePaginatedComments } from '../hooks/usePaginatedComments';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { NewCommentModalContainer } from '../components/NewCommentModalContainer';
import { Comment } from '../adapters/CommentsApi';

export const CommentsPageContainer: React.FC = () => {
    const {
        page,
        setPage,
        allComments,
        isLoading,
        isError,
        isFetching,
        hasMore,
    } = usePaginatedComments();

    const { loadMoreRef } = useInfiniteScroll({
        loading: isLoading || isFetching,
        hasMore,
        onLoadMore: () => setPage((p: number) => p + 1),
    });

    const [localComments, setLocalComments] = React.useState<Comment[]>([]);
    const isEmpty = !isLoading && allComments.length === 0 && localComments.length === 0;

    const handleCommentCreated = (comment: Comment) => {
        setLocalComments((prev) => [comment, ...prev]);
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" mb={2}>Comentarios</Typography>
            <NewCommentModalContainer onCommentCreated={handleCommentCreated} />
            {isLoading && page === 1 ? (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Box display="flex" flexDirection="column" alignItems="center" my={4}>
                    <Typography color="error">Error al cargar comentarios</Typography>
                </Box>
            ) : isEmpty ? (
                <Typography>No hay comentarios.</Typography>
            ) : (
                <>
                    <CommentGrid comments={[...localComments, ...allComments]} />
                    <div ref={loadMoreRef} style={{ height: 40 }} />
                    {isFetching && hasMore && (
                        <Box display="flex" justifyContent="center" my={2}>
                            <CircularProgress size={24} />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}; 