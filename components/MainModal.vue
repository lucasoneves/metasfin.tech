<template>
  <div
    ref="modalWrapper"
    @click="handleClick"
    v-if="active"
    class="modal-wrapper bg-gray-950/75 z-10 fixed h-full top-0 left-0 right-0 w-full m-auto bottom-0 flex justify-center items-center"
  >
    <div class="modal-content w-full mx-8 max-w-2xl bg-white p-6 rounded-lg">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <p class="text-gray-700 text-sm mb-4">{{ content }}</p>
      <slot></slot>
      <div
        v-if="cancelText || confirmText"
        class="actions max-w-6/12 ml-auto flex gap-4 mt-10"
      >
        <Button :text="cancelText" @click="emits('close')" class="flex-1" />
        <Button
          :text="confirmText"
          variant="success"
          @click="emits('save')"
          class="flex-1"
        />
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

const emits = defineEmits(["close", "save"]);

const modalWrapper = ref<HTMLElement | null>(null);

const handleClick = (event: MouseEvent) => {
  if (event.target === modalWrapper.value) {
    emits("close");
  }
};
</script>

<style></style>
