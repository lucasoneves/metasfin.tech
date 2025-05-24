<template>
  <header class="flex items-center gap-10 justify-between">
    <h2 class="text-3xl font-bold">Minhas Metas</h2>
    <button
      class="py-3 bg-blue-600 rounded-xl px-6 text-white text-sm flex items-center"
    >
      <Icon name="heroicons:plus" size="22"></Icon>
      Adicionar Nova Meta
    </button>
  </header>
  <p class="text-gray-700 mt-4">Acompanhe e gerencie suas metas financeiras</p>

  <section class="cards mt-10">
    <div class="card-challenge max-w-100 p-8 shadow rounded-xl bg-white">
      <h3 class="text-2xl font-bold mb-2">Férias de verão</h3>
      <span class="block text-xl mb-2">Saldo: <strong>R$ 1200</strong></span>
      <span class="text-xs">Meta: R$ 2400,00</span>
      <div class="percentage bg-gray-200 h-3 rounded-xl mb-10">
        <span class="block w-50 rounded-xl h-3 bg-green-600"></span>
      </div>

      <div class="actions flex justify-end gap-6">
        <button
          class="flex-1 bg-blue-600 rounded-xl text-white text-sm py-3 flex items-center justify-center"
        >
          <Icon name="heroicons:plus" size="22"></Icon>
          Novo aporte
        </button>
        <NuxtLink to="/challenges/1" class="flex items-center text-sm">
          <button class="cursor-pointer flex items-center text-sm">
            <Icon
              name="heroicons:pencil-square-16-solid"
              style="color: black"
              size="18"
            ></Icon>
            Editar
          </button>
        </NuxtLink>
        <button class="flex items-center text-sm">
          <Icon name="heroicons:trash" style="color: black" size="18"></Icon>
          Excluir
        </button>
      </div>
    </div>
  </section>

  <!-- 
  <div v-if="data == null">No data</div>
  <div v-for="item in data" :key="item.id">
    {{ item.title }}
  </div> -->
</template>

<script setup lang="ts">
// const { data } = await useFetch("https://jsonplaceholder.typicode.com/posts/");

// console.log(data.value);
</script>
