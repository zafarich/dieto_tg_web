import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const telegramUserId =
      window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 907423583;
    if (telegramUserId) {
      config.headers["telegram-user-id"] = telegramUserId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const userAPI = {
  createUser: (userData) => api.post("/users/create", userData),
  updateUserField: (fieldObject) => api.put("/users/update", fieldObject),
  getUser: () => api.get("/user/me"),
  getDailyStats: (date) => api.get(`/daily-stats/${date}`),
  getMeals: (date) => api.get(`/meals/${date}`),
};
