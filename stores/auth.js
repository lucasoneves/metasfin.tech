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
      if (process.client) {
        // Salva no localStorage para persistência
        localStorage.setItem("auth_token", token);
      }
    },
    setUser(user) {
      this.user = user;
      if (process.client) {
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
    },
    loadFromLocalStorage() {
      // Carrega o estado ao iniciar a aplicação
      if (process.client) {
        this.token = localStorage.getItem("auth_token");
        const userString = localStorage.getItem("auth_user");
        if (userString) {
          this.user = JSON.parse(userString);
        }
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      if (process.client) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
