import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useOrderStore = create((set, get) => ({
    orders: [],
    selectedOrder: null,
    isLoading: false,

    fetchOrders: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/api/orders");
            set({ orders: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch orders");
        } finally {
            set({ isLoading: false });
        }
    },

    fetchOrder: async (orderId) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/api/orders/${orderId}`);
            set({ selectedOrder: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch the order");
        } finally {
            set({ isLoading: false });
        }
    },
}));
