<template>
  <h2 class="text-3xl font-bold">Detalhe do challenge: {{ challengeId }}</h2>
</template>
<script setup lang="ts">
const route = useRoute();

const challengeId = route.params.id;

console.log(route.params.id);
</script>
