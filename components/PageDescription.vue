<template>
  <p class="text-gray-700 mt-4">{{ content }}</p>
</template>

<script lang="ts" setup>
interface Props {
  content: string;
}

const props = defineProps<Props>();
</script>

<style></style>
