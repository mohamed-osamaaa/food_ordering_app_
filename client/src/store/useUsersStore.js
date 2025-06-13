import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useUsersStore = create((set, get) => ({
    users: [],
    isLoading: false,

    fetchUsers: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/api/users");
            set({ users: res.data.data });
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            set({ isLoading: false });
        }
    },

    makeAdmin: async (userId) => {
        try {
            const res = await axiosInstance.post(`/api/users/${userId}`);
            set((state) => ({
                users: state.users.map((user) =>
                    user._id === userId ? res.data.data : user
                ),
            }));
            toast.success("User promoted to admin");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to make user admin");
        }
    },

    searchByName: async (name) => {
        try {
            const res = await axiosInstance.post(`/api/users/search`, { name });
            set({ users: res.data.data });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to make user admin");
        }
    },
}));
