// stores/auth.js

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userToken: (state) => state.token,
  },
  persist: true,
});
