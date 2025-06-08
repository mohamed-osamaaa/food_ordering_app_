import toast from "react-hot-toast";
import { create } from "zustand";

import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isRegister: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data.data.user });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data.data.user });
            toast.success("Logged in successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    register: async (data) => {
        set({ isRegister: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data.data.user });
            toast.success("Account created successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({ isRegister: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            set({ authUser: null });
        }
    },
}));
