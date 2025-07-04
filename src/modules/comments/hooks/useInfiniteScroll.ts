import { useRef, useCallback, useEffect } from 'react';

export function useInfiniteScroll({ loading, hasMore, onLoadMore }: {
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}) {
    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new window.IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onLoadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, onLoadMore]);

    useEffect(() => {
        if (loadMoreRef.current) {
            lastElementRef(loadMoreRef.current);
        }
    }, [lastElementRef]);

    return { loadMoreRef };
} 