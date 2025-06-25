<template>
  <h2 class="text-2xl font-bold md:text-3xl">{{ content }}</h2>
</template>

<script lang="ts" setup>
const props = defineProps({
  content: String,
});
</script>

<style></style>
