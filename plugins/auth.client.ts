import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
  // Este plugin é executado no lado do cliente, após o Pinia ser instalado.
  // Agora podemos acessar a store com segurança.
  const authStore = useAuthStore();

  // Se a store ainda não estiver populada (por exemplo, pelo estado do SSR),
  // tentamos carregar o estado do localStorage.
  if (!authStore.isAuthenticated) {
    authStore.loadFromLocalStorage();
  }
});
