import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useItemStore = create((set, get) => ({
    items: [],
    isLoading: false,

    fetchItems: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/api/items");
            set({ items: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch items");
        } finally {
            set({ isLoading: false });
        }
    },

    createItem: async (itemData) => {
        try {
            const formData = new FormData();
            for (const key in itemData) {
                formData.append(key, itemData[key]);
            }

            const res = await axiosInstance.post("/api/items", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            set((state) => ({
                items: [...state.items, res.data.data],
            }));
            toast.success("Item created successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create item");
        }
    },

    updateItem: async (itemId, updatedData) => {
        try {
            const res = await axiosInstance.patch(`/api/items/${itemId}`, updatedData);

            set((state) => ({
                items: state.items.map((item) =>
                    item._id === itemId ? res.data.data : item
                ),
            }));

            toast.success("Item updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update item");
        }
    },

    deleteItem: async (itemId) => {
        try {
            await axiosInstance.delete(`/api/items/${itemId}`);
            set((state) => ({
                items: state.items.filter((item) => item._id !== itemId),
            }));
            toast.success("Item deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete item");
        }
    },

    deleteExtraIngredient: async (itemId, ingredientName) => {
        try {
            const res = await axiosInstance.delete(
                `/api/items/${itemId}/${ingredientName}`
            );
            set((state) => ({
                items: state.items.map((item) =>
                    item._id === itemId ? res.data.updatedItem : item
                ),
            }));
            toast.success("Ingredient deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete ingredient");
        }
    },

    deleteSize: async (itemId, sizeValue) => {
        try {
            const res = await axiosInstance.delete(
                `/api/items/${itemId}/${sizeValue}`
            );
            set((state) => ({
                items: state.items.map((item) =>
                    item._id === itemId ? res.data.updatedItem : item
                ),
            }));
            toast.success("Size deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete size");
        }
    },
}));
