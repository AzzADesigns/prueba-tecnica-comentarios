import type { Meta, StoryObj } from "@storybook/react";
import { CommentCard } from "./CommentCard";

const meta: Meta<typeof CommentCard> = {
    title: "GLOBAL/ui/molecules/CommentCard",
    component: CommentCard,
    args: {
        title: "id labore ex et quam laborum",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem..... ",
        email: "Eliseo@gardner.biz",
    },
};
export default meta;
type Story = StoryObj<typeof CommentCard>;

export const Default: Story = {};
