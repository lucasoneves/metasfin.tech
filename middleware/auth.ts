// middleware/auth.js
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (
    !authStore.isAuthenticated &&
    to.path !== "/login" &&
    !to.path.startsWith("/auth/google/callback")
  ) {
    // Redireciona para a página de login se não estiver autenticado
    return navigateTo("/login");
  }
});
