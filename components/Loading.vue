<template>
  <section
    v-if="visible"
    class="loader-wrapper z-10 fixed top-0 bg-white/75 400 h-full w-full flex items-center justify-center left-0"
  >
    <div class="loader"></div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #155dfc 94%, #0000) top/8px 8px
      no-repeat,
    conic-gradient(#0000 30%, #155dfc);
  -webkit-mask: radial-gradient(
    farthest-side,
    #fafafa00 calc(100% - 8px),
    #000 0
  );
  animation: l13 0.75s infinite linear;
}
@keyframes l13 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
