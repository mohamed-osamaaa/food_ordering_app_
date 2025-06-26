import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useCartStore = create((set) => ({
    cart: null,
    itemCount: 0,
    isLoading: false,
    isAddingToCart: false,
    isRemovingFromCart: false,

    addToCart: async (item) => {
        set({ isAddingToCart: true });
        try {
            const res = await axiosInstance.post("/api/cart", { item });
            set({ cart: res.data.cart, itemCount: res.data.itemCount });
            toast.success("Item added to cart");
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add item to cart");
            return false;
        } finally {
            set({ isAddingToCart: false });
        }
    },

    removeFromCart: async (itemId) => {
        set({ isRemovingFromCart: true });
        try {
            const res = await axiosInstance.delete("/api/cart", {
                data: { itemId },
            });
            set({ cart: res.data.cart, itemCount: res.data.itemCount });
            toast.success("Item removed from cart");
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to remove item from cart");
            return false;
        } finally {
            set({ isRemovingFromCart: false });
        }
    },

    getCart: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/api/cart");
            set({ cart: res.data.cart, itemCount: res.data.itemCount });
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch cart");
            return false;
        } finally {
            set({ isLoading: false });
        }
    },
}));
