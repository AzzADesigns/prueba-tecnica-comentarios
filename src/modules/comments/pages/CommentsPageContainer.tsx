"use client";
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { CommentGrid } from '../components/CommentGrid';
import { usePaginatedComments } from '../hooks/usePaginatedComments';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

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

    const isEmpty = !isLoading && allComments.length === 0;

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" mb={2}>Comentarios</Typography>
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
                    <CommentGrid comments={allComments} />
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