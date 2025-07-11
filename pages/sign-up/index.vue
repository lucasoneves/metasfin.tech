<template>
  <div
    class="mt-10 ml-auto mr-auto flex gap-4 flex-col w-full md:w-6/12 bg-white p-10 shadow-sm rounded-sm"
  >
    <form
      action=""
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
      novalidate
    >
      <PageTitle content="Criar Conta" />
      <PageDescription
        content="Crie sua conta e dê o primeiro passo para transformar seus sonhos em realidade. Organize suas metas e acompanhe seu progresso."
        class="text-sm text-center"
      />
      <section>
        <label for="name" class="text-sm font-bold">Nome</label>
        <input
          v-model="userName"
          id="name"
          name="name"
          type="text"
          autocomplete="name"
          required
          autofocus
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </section>
      <section>
        <label for="email" class="text-sm font-bold">Email</label>
        <input
          v-model="userEmail"
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </section>
      <section>
        <label for="password" class="text-sm font-bold">Senha</label>
        <input
          v-model="userPassword"
          id="password"
          name="password"
          type="password"
          autocomplete="new-password"
          required
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </section>
      <Button text="Criar Conta" variant="primary" class="mt-4" />
    </form>

    <footer class="flex gap-2 justify-center">
      <NuxtLink to="/sign-in" class="text-xs text-blue-800 text-center mt-5">
        Já tenho uma conta
      </NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
const userName = ref("");
const userEmail = ref("");
const userPassword = ref("");
const { showToast } = useToast();

const handleSubmit = () => {
  if (!userName.value || !userEmail.value || !userPassword.value) {
    showToast("Por favor, preencha todos os campos.", "Error");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail.value)) {
    showToast("Por favor, insira um email válido.", "Error");
    return;
  }

  if (userPassword.value.length < 6) {
    showToast("A senha deve ter no mínimo 6 caracteres.", "Error");
    return;
  }

  console.log("Usuário válido, pronto para registrar:", {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  });
};
</script>
