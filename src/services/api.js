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
  createOrUpdate: (userData) => api.post("/users", userData),
  getUser: (telegramId) => api.get(`/users/${telegramId}`),
  calculateGoals: (telegramId) =>
    api.post(`/users/${telegramId}/calculate-goals`),
};
