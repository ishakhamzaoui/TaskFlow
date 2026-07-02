export type Category = 'Work' | 'Personal' | 'Shopping' | 'Study';

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    category: Category;
};