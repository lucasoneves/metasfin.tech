// middleware/auth.js
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  console.log("[AuthMiddleware] Executando para a rota:", to.path);
  console.log(
    "[AuthMiddleware] authStore.isAuthenticated no middleware:",
    authStore.isAuthenticated
  );

  if (!authStore.isAuthenticated) {
    console.log(
      "[AuthMiddleware] Usuário NÃO autenticado. Redirecionando para /sign-in."
    );
    return navigateTo("/sign-in", {
      replace: true,
    });
  } else {
    console.log("[AuthMiddleware] Usuário AUTENTICADO. Permite navegação.");
  }
});
