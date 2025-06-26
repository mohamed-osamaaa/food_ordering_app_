import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useCategoryStore = create((set) => ({
    categories: [],
    isLoading: false,

    fetchCategories: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/api/categories");
            set({ categories: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch categories");
            console.log(error);
        } finally {
            set({ isLoading: false });
        }
    },

    createCategory: async (name) => {
        try {
            const res = await axiosInstance.post("/api/categories", { name });
            set((state) => ({
                categories: [...state.categories, res.data.data],
            }));
            toast.success("Category created successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create category");
        }
    },

    updateCategory: async (id, name) => {
        try {
            const res = await axiosInstance.put(`/api/categories/${id}`, { name });
            set((state) => ({
                categories: state.categories.map((cat) =>
                    cat._id === id ? res.data.data : cat
                ),
            }));
            toast.success("Category updated successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update category");
        }
    },

    deleteCategory: async (id) => {
        try {
            await axiosInstance.delete(`/api/categories/${id}`);
            set((state) => ({
                categories: state.categories.filter((cat) => cat._id !== id),
            }));
            toast.success("Category deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete category");
        }
    },
}));
