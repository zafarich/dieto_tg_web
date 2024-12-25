import { defineStore } from 'pinia'

interface AuthState {
  isAuthenticated: boolean
  user: any | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    login(userData: any) {
      this.isAuthenticated = true
      this.user = userData
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
    }
  },
  persist: true
})