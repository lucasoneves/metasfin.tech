import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // A store só deve ser acessada DENTRO da função do middleware.
  const authStore = useAuthStore();

  // O plugin `auth.client.ts` garante que o estado é carregado do localStorage
  // antes deste middleware ser executado em navegações no lado do cliente.
  if (!authStore.isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado,
    // salvando a rota de destino para redirecionar de volta após o login.
    return navigateTo("/sign-in", {
      replace: true,
    });
  }
});
