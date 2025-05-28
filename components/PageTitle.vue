<template>
  <h2 class="text-3xl font-bold">{{ content }}</h2>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: String,
});
</script>

<style></style>
