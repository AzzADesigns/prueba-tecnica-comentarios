"use client";
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { CommentGrid } from "../components/CommentGrid";
import { usePaginatedComments } from "../hooks/usePaginatedComments";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { NewCommentModalContainer } from "../components/NewCommentModalContainer";
import { EditCommentModalContainer } from "../components/EditCommentModalContainer";
import { FeedbackSnackbar } from "@/GLOBAL/ui";
import styled from "styled-components";

import { useLocalCommentsStore } from "../store/localCommentsStore";
import { useCommentOperations } from "../hooks/useCommentOperations";

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1rem;
  text-align: center;
`;

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

    const {
        handleCommentDelete,
        handleCommentEdit,
        handleEditClose,
        handleEditSuccess,
        handleCommentCreated,
        deletingIds,
        editingComment,
        feedback,
        clearFeedback,
        applyOptimisticUpdates,
    } = useCommentOperations();

    const { localComments } = useLocalCommentsStore();

    const allCommentsCombined = [
        ...localComments,
        ...applyOptimisticUpdates(allComments),
    ];
    const isEmpty = !isLoading && allCommentsCombined.length === 0;

    return (
        <>
            <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <StyledTitle>Lista de Comentarios</StyledTitle>
                    <NewCommentModalContainer
                        onCommentCreated={handleCommentCreated}
                    />
                </Box>
                {isLoading && page === 1 ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        my={4}
                    >
                        <StyledTitle style={{ color: '#d32f2f', fontSize: '1.5rem' }}>Error al cargar comentarios</StyledTitle>
                    </Box>
                ) : isEmpty ? (
                    <StyledTitle style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>No hay comentarios.</StyledTitle>
                ) : (
                    <>
                        <CommentGrid
                            comments={allCommentsCombined}
                            onEdit={(id) =>
                                handleCommentEdit(id, allCommentsCombined)
                            }
                            onDelete={(id) =>
                                handleCommentDelete(id, allCommentsCombined)
                            }
                            deletingIds={deletingIds}
                        />
                        <div ref={loadMoreRef} style={{ height: 40 }} />
                        {isFetching && hasMore && (
                            <Box display="flex" justifyContent="center" my={2}>
                                <CircularProgress size={24} />
                            </Box>
                        )}
                    </>
                )}
            </Box>
            <EditCommentModalContainer
                comment={editingComment}
                open={!!editingComment}
                onClose={handleEditClose}
                onEditSuccess={handleEditSuccess}
            />
            <FeedbackSnackbar
                open={!!feedback.error}
                message={feedback.error || ""}
                severity="error"
                onClose={clearFeedback}
            />
            <FeedbackSnackbar
                open={!!feedback.success}
                message={feedback.success || ""}
                severity="success"
                onClose={clearFeedback}
            />
        </>
    );
};
