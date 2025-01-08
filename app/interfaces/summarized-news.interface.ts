export interface SummarizedNewsInterface {
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    id: string;
    title: string;
    content: string;
    tags: string[];
    categories: string[];
    mood: string
    score: number;
}