<template>
  <Header />
  <NuxtRouteAnnouncer />
  <div class="max-w-6xl mx-auto px-4 py-12">
    <NuxtPage />
    <Loading :visible="loading" />
  </div>
</template>
<script lang="ts" setup>
const loading = useLoading();
</script>
<style></style>
