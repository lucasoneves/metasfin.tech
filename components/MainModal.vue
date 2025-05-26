<template>
  <div
    ref="modalWrapper"
    @click="handleClick"
    v-if="active"
    class="modal-wrapper bg-gray-950/75 z-10 fixed h-full top-0 left-0 right-0 w-full m-auto bottom-0 flex justify-center items-center"
  >
    <div class="modal-content w-full max-w-2xl bg-white p-4 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <p>{{ content }}</p>
      <div v-if="cancelText || confirmText" class="actions mt-10">
        <button v-if="cancelText">{{ cancelText }}</button>
        <button v-if="confirmText" type="submit">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  active: Boolean,
  title: String,
  content: String,
  confirmText: String,
  cancelText: String,
});

const emit = defineEmits(["close"]);
const modalWrapper = ref<HTMLElement | null>(null);

const handleClick = (event: MouseEvent) => {
  if (event.target === modalWrapper.value) {
    emit("close");
  }
};
</script>

<style></style>
