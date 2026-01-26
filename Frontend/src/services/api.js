import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.2.2:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// RESPONSE: auto refresh
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken =
                await AsyncStorage.getItem("refreshToken");

            if (!refreshToken) return Promise.reject(error);

            const res = await axios.post(
                "http://10.0.2.2:3000/api/auth/refresh-token",
                { refreshToken }
            );

            await AsyncStorage.setItem(
                "accessToken",
                res.data.accessToken
            );

            originalRequest.headers.Authorization =
                `Bearer ${res.data.accessToken}`;

            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default api;
// navkar