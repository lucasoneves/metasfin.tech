<template>
  <h2 class="text-3xl font-bold">Minhas Metas</h2>
  <p class="text-gray-700 mt-4">Acompanhe e gerencie suas metas financeiras</p>

  <section class="cards mt-10">
    <div class="card-challenge max-w-100 p-8 shadow rounded-xl bg-white">
      <h3 class="text-2xl font-bold mb-2">Férias de verão</h3>
      <span class="block text-xl font-bold mb-2">R$ 1200</span>
      <span class="text-xs">Meta: R$ 2400,00</span>
      <div class="percentage bg-gray-200 h-3 rounded-xl mb-10">
        <span class="block w-50 rounded-xl h-3 bg-green-600"></span>
      </div>

      <div class="actions flex justify-end gap-6">
        <button>Editar</button>
        <button>Excluir</button>
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
