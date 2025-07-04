"use client";

import { CommentsPageContainer } from "@/modules/comments/pages/CommentsPageContainer";

export default function Home() {
    return (
        <div className="bg-background text-foreground">
            <CommentsPageContainer />
        </div>
    );
}