import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/comments';

export interface Comment {
    postId?: number;
    id?: number;
    name: string;
    email: string;
    body: string;
}

export const commentsApi = {
    list: async (): Promise<Comment[]> => {
        const { data } = await axios.get(BASE_URL);
        return data;
    },
    create: async (comment: Omit<Comment, 'id'>): Promise<Comment> => {
        const { data } = await axios.post(BASE_URL, comment);
        return data;
    },
    update: async (id: number, comment: Partial<Comment>): Promise<Comment> => {
        const { data } = await axios.put(`${BASE_URL}/${id}`, comment);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await axios.delete(`${BASE_URL}/${id}`);
    },
};
