// middleware/auth.js
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    return navigateTo("/", {
      replace: true,
    });
  }
  // If authenticated, allow navigation to proceed
});
