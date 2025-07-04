"use client";
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CommentGrid } from "../components/CommentGrid";
import { usePaginatedComments } from "../hooks/usePaginatedComments";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { NewCommentModalContainer } from "../components/NewCommentModalContainer";
import { EditCommentModalContainer } from "../components/EditCommentModalContainer";
import { FeedbackSnackbar } from "@/GLOBAL/ui";

import { useLocalCommentsStore } from "../store/localCommentsStore";
import { useCommentOperations } from "../hooks/useCommentOperations";

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
                    <Typography variant="h4" sx={{ color: "#000", mb: 1 }}>
                        Comentarios
                    </Typography>
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
                        <Typography color="error">
                            Error al cargar comentarios
                        </Typography>
                    </Box>
                ) : isEmpty ? (
                    <Typography>No hay comentarios.</Typography>
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
