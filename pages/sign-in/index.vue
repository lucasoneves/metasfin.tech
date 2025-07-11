<template>
  <div
    class="mt-10 ml-auto mr-auto flex gap-4 flex-col w-full md:w-6/12 bg-white p-10 shadow-sm rounded-sm"
  >
    <form action="" class="flex flex-col gap-4">
      <PageTitle content="Login" />
      <PageDescription
        content="Que bom te ver de novo! Faça o login para continuar no caminho de suas conquistas financeiras."
        class="text-sm"
      />
      <section>
        <label for="email" class="text-sm font-bold">Email</label>
        <input
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

<script setup lang="ts"></script>

<style scoped></style>
