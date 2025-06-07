import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        process.env.MODE === "development" ? process.env.SERVER_URL : "/api",
    withCredentials: true,
});
