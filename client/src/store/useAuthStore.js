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
            const res = await axiosInstance.get("/api/auth/check-auth");
            set({ authUser: res.data.data });
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
            const res = await axiosInstance.post("/api/auth/login", data);
            set({ authUser: res.data.data });
            toast.success("Logged in successfully");
            return true;
        } catch (error) {
            const response = error?.response?.data;

            if (response?.errors && Array.isArray(response.errors)) {
                const shownMessages = new Set();
                response.errors.forEach((err) => {
                    const msg = `${err.path}: ${err.msg}`;
                    if (!shownMessages.has(msg)) {
                        toast.error(msg);
                        shownMessages.add(msg);
                    }
                });
            } else {
                toast.error(response?.message || "Login failed");
            }

            return false;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // register: async (data) => {
    //     set({ isRegister: true });
    //     try {
    //         const res = await axiosInstance.post("/api/auth/register", data);
    //         set({ authUser: res.data.data });
    //         toast.success("Account created successfully");
    //         return true;
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //         return false;
    //     } finally {
    //         set({ isRegister: false });
    //     }
    // },
    register: async (data) => {
        set({ isRegister: true });

        try {
            const formData = new FormData();
            formData.append("fullname", data.fullname);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("phone", data.phone);
            formData.append("address", data.address);

            if (data.profileImage) {
                formData.append("profileImage", data.profileImage);
            }

            const res = await axiosInstance.post("/api/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            set({ authUser: res.data.data });
            toast.success("Account created successfully");
            return true;
        } catch (error) {
            const response = error?.response?.data;

            if (response?.errors && Array.isArray(response.errors)) {
                const shownMessages = new Set();
                response.errors.forEach((err) => {
                    const msg = `${err.path}: ${err.msg}`;
                    if (!shownMessages.has(msg)) {
                        toast.error(msg);
                        shownMessages.add(msg);
                    }
                });
            } else {
                toast.error(response?.message || "Registration failed");
            }

            return false;
        } finally {
            set({ isRegister: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/api/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            set({ authUser: null });
        }
    },
}));
