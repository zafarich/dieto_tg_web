import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Telegram WebApp ma'lumotlarini headerga qo'shish
api.interceptors.request.use((config) => {
  //   if (window?.Telegram?.WebApp) {
  const userID =
    window?.Telegram?.WebApp?.initDataUnsafe?.user?.id || 907423583;
  if (userID) {
    config.headers["telegram-user-id"] = userID;
  }
  //   }
  return config;
});

export const userAPI = {
  createOrUpdate: (userData) => api.post("/users", userData),
  getUser: (telegramId) => api.get(`/users/${telegramId}`),
  calculateGoals: (telegramId) =>
    api.post(`/users/${telegramId}/calculate-goals`),
};
