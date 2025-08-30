import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

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
    category: {
        name: string;
    };
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
    selectedItems: Item[];
    selectedItem: Item | null; 
    isLoading: boolean;
    error: string | null;
    fetchItems: () => Promise<{ categories: Category[]; itemsByCategory: Record<string, Item[]> } | null>;
    fetchItemsByIds: (ids: string[]) => Promise<Item[] | null>;
    fetchItemById: (id: string) => Promise<Item | null>;
}

export const useItemStore = create<ItemStore>((set) => ({
    categories: [],
    itemsByCategory: {},
    selectedItems: [],
    selectedItem: null, 
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

            // // Create a map of category ID to category name
            // const categoryMap = categories.reduce((acc, category) => {
            //     acc[category._id] = category.name.toLowerCase();
            //     return acc;
            // }, {} as Record<string, string>);

            // Initialize itemsByCategory with empty arrays for each category
            const itemsByCategory = categories.reduce((acc, category) => {
                acc[category.name.toLowerCase()] = [];
                return acc;
            }, {} as Record<string, Item[]>);

            // // Categorize items
            // items.forEach(item => {
            //     const categoryName = categoryMap[item.category];
            //     if (categoryName && itemsByCategory[categoryName]) {
            //         itemsByCategory[categoryName].push(item);
            //     }
            // });

            // Categorize items
            items.forEach(item => {
                const categoryName = item.category.name.toLowerCase();
                if (itemsByCategory[categoryName]) {
                    itemsByCategory[categoryName].push(item);
                }
            });

            set({
                categories,
                itemsByCategory,
                isLoading: false,
            });
            // toast.success("Items loaded successfully");
            return { categories, itemsByCategory };
        } catch (error: unknown) {
            let message = 'Failed to fetch data';
            if (error instanceof AxiosError && error.response) {
                message = error.response.data?.message || message;
            }

            set({ error: message, isLoading: false });
            toast.error(message);
            toast.error(message);
            return null;
        }
    },

    fetchItemsByIds: async (ids: string[]) => {
        set({ isLoading: true, error: null });
        try {
            const itemPromises = ids.map(id =>
                axiosInstance.get(`/api/items/${id}`)
            );

            const responses = await Promise.allSettled(itemPromises);

            const items: Item[] = [];
            const errors: string[] = [];

            responses.forEach((response, index) => {
                if (response.status === 'fulfilled') {
                    items.push(response.value.data.data);
                } else {
                    errors.push(`Failed to fetch item with ID: ${ids[index]}`);
                }
            });

            set({
                selectedItems: items,
                isLoading: false,
                error: errors.length > 0 ? errors.join(', ') : null,
            });

            // if (items.length > 0) {
            //     toast.success(`Successfully loaded ${items.length} item${items.length > 1 ? "s" : ""}`);
            // }

            if (errors.length > 0) {
                toast.error(errors.length > 0 ? errors.join(', ') : null);
            }

            return items.length > 0 ? items : null;
        } catch (error: unknown) {
            // set({
            //     error: error.response?.data?.message || 'Failed to fetch items by IDs',
            //     isLoading: false,
            // });
            let message = 'Failed to fetch data';
            if (error instanceof AxiosError && error.response) {
                message = error.response.data?.message || message;
            }

            set({ error: message, isLoading: false });
            toast.error(message);
            toast.error(message);
            return null;
        }
    },

    fetchItemById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/api/items/${id}`);

            const item: Item = response.data.data;

            set({
                selectedItem: item,
                isLoading: false,
                error: null,
            });
            // toast.success("Item loaded successfully");
            return item;
        } catch (error: unknown) {
            let message = 'Failed to fetch data';
            if (error instanceof AxiosError && error.response) {
                message = error.response.data?.message || message;
            }

            set({ error: message, isLoading: false });
            toast.error(message);
            toast.error(message);
            return null;
        }
    },
}));
