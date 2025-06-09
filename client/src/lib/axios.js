import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_API_URL
            : "/api",
    withCredentials: true,
});
