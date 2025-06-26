import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useCheckoutStore = create((set) => ({
    isLoading: false,
    isCreatingSession: false,
    isFetchingSuccessDetails: false,
    isProcessingWebhook: false,
    successData: null,

    createCheckoutSession: async () => {
        set({ isCreatingSession: true });
        try {
            const res = await axiosInstance.post("/api/check-out");

            // Redirect to Stripe checkout
            if (res.data.url) {
                window.location.href = res.data.url;
            }

            toast.success("Redirecting to checkout...");
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create checkout session");
            return false;
        } finally {
            set({ isCreatingSession: false });
        }
    },

    getSuccessPageDetails: async () => {
        set({ isFetchingSuccessDetails: true });
        try {
            const res = await axiosInstance.get("/api/check-out/successPageDetails");
            set({ successData: res.data });
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch order details");
            return false;
        } finally {
            set({ isFetchingSuccessDetails: false });
        }
    },

    processWebhook: async () => {
        set({ isProcessingWebhook: true });
        try {
            await axiosInstance.post("/api/check-out/success");
            toast.success("Order completed successfully!");
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to process order");
            return false;
        } finally {
            set({ isProcessingWebhook: false });
        }
    },
}));