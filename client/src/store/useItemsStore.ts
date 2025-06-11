import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

// Type definitions based on API response
interface Category {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Item {
    _id: string;
    name: string;
    description: string;
    category: string; // Category ID (string)
    itemImage: string;
    sizes: { size: string; price: number; _id: string }[];
    extraIngredients: { name: string; price: number; _id: string }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ItemStore {
    categories: Category[];
    itemsByCategory: Record<string, Item[]>;
    isLoading: boolean;
    error: string | null;
    fetchItems: () => Promise<{ categories: Category[]; itemsByCategory: Record<string, Item[]> } | null>;
}

export const useItemStore = create<ItemStore>((set, get) => ({
    categories: [],
    itemsByCategory: {},
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            // Fetch categories
            const categoriesRes = await axiosInstance.get('/api/categories');
            const categories: Category[] = categoriesRes.data.data;

            // Fetch items
            const itemsRes = await axiosInstance.get('/api/items');
            const items: Item[] = itemsRes.data.data;

            // Create a map of category ID to category name
            const categoryMap = categories.reduce((acc, category) => {
                acc[category._id] = category.name.toLowerCase();
                return acc;
            }, {} as Record<string, string>);

            // Initialize itemsByCategory with empty arrays for each category
            const itemsByCategory = categories.reduce((acc, category) => {
                acc[category.name.toLowerCase()] = [];
                return acc;
            }, {} as Record<string, Item[]>);

            // Categorize items
            items.forEach(item => {
                const categoryName = categoryMap[item.category];
                if (categoryName && itemsByCategory[categoryName]) {
                    itemsByCategory[categoryName].push(item);
                }
            });
            // console.log(items);

            set({
                categories,
                itemsByCategory,
                isLoading: false,
            });
            return { categories, itemsByCategory };
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Failed to fetch data',
                isLoading: false,
            });
            return null;
        }
    },
}));