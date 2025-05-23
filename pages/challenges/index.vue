<template>
  <h2 class="text-3xl font-bold">Challenges Page</h2>

  <NuxtLink to="challenges/1">Challenge 1</NuxtLink>
  <NuxtLink to="challenges/2">Challenge 2</NuxtLink>
  <NuxtLink to="challenges/3">Challenge 3</NuxtLink>
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
