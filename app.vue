<template>
  <Header />
  <NuxtRouteAnnouncer />
  <div class="max-w-6xl mx-auto px-4 py-12">
    <NuxtPage />
  </div>
  <Loading :visible="loading" />
  <Toast />
</template>
<script lang="ts" setup>
const loading = useLoading();
// O componente Toast agora gerencia seu próprio estado via useToast(),
// então não precisamos mais obter `toast` aqui para passá-lo como prop.
</script>
<style></style>
