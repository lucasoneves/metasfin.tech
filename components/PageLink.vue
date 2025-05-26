<template>
  <NuxtLink to="/challenges/1" :class="`flex items-center text-sm w-full`">
    <slot></slot>
    {{ text }}
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  path: String,
  text: String,
});
</script>

<style></style>
