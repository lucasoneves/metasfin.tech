import { defineStore } from "pinia";

export interface User {
  id: number;
  username: string;
  email: string;
  // Adicione outras propriedades do usuário conforme necessário
}

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(token: string | null) {
      this.token = token;
    },
    setUser(user: User | null) {
      this.user = user;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userToken: (state): string | null => state.token,
  },
  persist: true,
});
