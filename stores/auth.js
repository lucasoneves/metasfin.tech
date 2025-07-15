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
      if (import.meta.client) {
        if (token) {
          // Salva no localStorage para persistência
          localStorage.setItem("auth_token", token);
        } else {
          localStorage.removeItem("auth_token");
        }
      }
    },
    setUser(user) {
      this.user = user;
      if (import.meta.client) {
        if (user) {
          localStorage.setItem("auth_user", JSON.stringify(user));
        } else {
          localStorage.removeItem("auth_user");
        }
      }
    },
    loadFromLocalStorage() {
      // Carrega o estado ao iniciar a aplicação
      if (import.meta.client) {
        this.token = localStorage.getItem("auth_token");
        const userString = localStorage.getItem("auth_user");
        if (userString && userString !== "undefined") {
          try {
            this.user = JSON.parse(userString);
          } catch (e) {
            console.error(
              "Falha ao analisar dados do usuário, limpando localStorage.",
              e
            );
            this.user = null;
            localStorage.removeItem("auth_user");
          }
        }
      }
    },
    logout() {
      // Chamar as actions `set` com `null` garante que o localStorage também seja limpo.
      this.setToken(null);
      this.setUser(null);
    },
  },
  getters: {
    // Uma verificação mais robusta inclui o token e o usuário.
    isAuthenticated: (state) => !!state.token && !!state.user,
  },
});
