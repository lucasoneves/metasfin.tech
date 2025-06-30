<template>
  <div class="home-page">
    <main class="content">
      <h2 class="text-3xl font-bold mb-4">Bem-vindo(a)! ao Metasfin.tech</h2>
      <p>
        Organize suas finanças, estabeleça metas claras e acompanhe seu
        progresso para alcançar seus objetivos.
      </p>

      <div class="summary-card">
        <h3 class="mt-4 mb-4 text-2xl font-bold">Seu Resumo Rápido</h3>
        <div class="flex items-center gap-2">
          <div
            class="p-4 flex items-center h-40 flex-1 justify-center flex-col gap-2 shadow-md"
          >
            <h3 class="text-3xl font-bold">3</h3>
            <span class="text-lg">Metas ativas</span>
          </div>
          <div
            class="p-4 flex items-center h-40 flex-1 gap-2 justify-center flex-col shadow-md"
          >
            <h3 class="text-lg">Saldo total de</h3>
            <span class="text-3xl font-bold">R$ 250,00</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center mt-6 mb-6">
        <router-link
          to="/challenges"
          class="rounded-xl cursor-pointer text-sm py-3 w-full max-w-2xs flex items-center justify-center`"
        >
          <Button variant="primary" text="Gerenciar Minhas Metas" />
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
// Se estiver usando Vue.js 3 com Composition API, este arquivo será um componente Vue.
// Por enquanto, não há lógica complexa aqui, apenas a estrutura.
</script>

<style scoped></style>
