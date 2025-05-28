<template>
  <PageTitle :content="`Detalhe do challenge: ${challengeId}`" />
  <PageDescription
    content="Visualize e edite os detalhes da sua meta financeira. Acompanhe seu progresso e faça os ajustes necessários."
  />
</template>
<script setup lang="ts">
const route = useRoute();

const challengeId = route.params.id;

console.log(route.params.id);
</script>
