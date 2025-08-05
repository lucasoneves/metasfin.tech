<template>
  <div
    class="mt-10 ml-auto mr-auto flex gap-4 flex-col w-full md:w-6/12 bg-white p-10 shadow-sm rounded-sm"
  >
    <form
      action=""
      class="flex flex-col gap-4"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <PageTitle content="Login" />
      <PageDescription
        content="Que bom te ver de novo! Faça o login para continuar no caminho de suas conquistas financeiras."
        class="text-sm"
      />
      <section>
        <label for="email" class="text-sm font-bold">Email</label>
        <input
          v-model="userEmail"
          id="email"
          name="email"
          type="email"
          autocomplete="username"
          required
          autofocus
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </section>
      <section>
        <label for="password" class="text-sm font-bold">Password</label>
        <input
          v-model="userPassword"
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </section>
      <Button text="Entrar" variant="primary" class="mt-4" />
    </form>

    <footer class="flex gap-2 justify-between">
      <NuxtLink
        to="/sign-in/recover-password"
        class="text-xs text-blue-800 text-center mt-5"
      >
        Esqueci a senha
      </NuxtLink>
      <NuxtLink to="/sign-up" class="text-xs text-blue-800 text-center mt-5">
        Criar uma conta
      </NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "guest",
});

import { useAuthStore, type User } from "~/stores/auth";

const userEmail = ref<string>("");
const loading = useLoading();
const userPassword = ref<string>("");
const { showToast } = useToast();
const config = useRuntimeConfig();
const authStore = useAuthStore();

interface LoginResponse {
  token: string;
  user: User;
}

const handleSubmit = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail.value)) {
    showToast("Por favor, insira um email válido.", "Error");
    return;
  }
  if (userPassword.value.length < 6) {
    showToast("A senha deve ter no mínimo 6 caracteres.", "Error");
    return;
  }
  if (!userEmail.value || !userPassword.value) {
    showToast("Por favor, preencha todos os campos.", "Error");
    return;
  }

  try {
    loading.value = true;
    const { data, error } = await useFetch<LoginResponse>(
      `${config.public.apiBaseUrl}/auth/login`,

      {
        method: "POST",
        body: {
          email: userEmail.value,
          password: userPassword.value,
        },
      }
    );

    if (error.value) {
      console.error("Erro ao realizar o login:", error.value);
      const errorMessage =
        error.value.data?.error || // Tenta pegar msg de erro da API
        error.value.message ||
        "Erro ao realizar o login. Tente novamente.";
      showToast(errorMessage, "Error");
    } else if (data.value) {
      authStore.setToken(data.value.token);
      authStore.setUser(data.value.user); // <-- Adicione esta linha
      showToast("Login realizado com sucesso", "Success");
      await navigateTo("/challenges"); // Ou para a página de dashboard
    }
  } catch (err) {
    console.error("Erro inesperado ao realizar o login:", err);
    showToast(
      "Ocorreu um erro inesperado. Por favor, tente novamente.",
      "Error"
    );
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
