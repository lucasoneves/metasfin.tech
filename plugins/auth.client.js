// plugins/auth.client.js (crie este arquivo)
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // Garante que este código só rode no cliente (navegador)
  if (process.client) {
    const authStore = useAuthStore(nuxtApp.$pinia);
    authStore.loadFromLocalStorage();
  }
});
