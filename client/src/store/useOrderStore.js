import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useOrderStore = create((set) => ({
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
            console.log(error);
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
            console.log(error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
