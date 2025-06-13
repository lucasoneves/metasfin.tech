<template>
  <Transition
    name="toast-slide"
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="toastState.isVisible"
      :class="toastClasses"
      role="alert"
      aria-live="assertive"
    >
      <span class="text-sm text-white">{{ toastState.message }}</span>
      <button
        class="text-sm flex items-center"
        @click="handleCloseToast"
        aria-label="Fechar notificação"
      >
        <Icon name="heroicons:x-mark" size="16" class="text-white" />
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useToast } from "~/composables/useToast"; // Certifique-se que o caminho está correto

const { toastState, hideToast } = useToast();

const handleCloseToast = () => {
  hideToast();
};

const toastClasses = computed(() => {
  const baseClasses = [
    "fixed", // Posição fixa
    "flex", // Layout flexível
    "items-center", // Alinhar itens ao centro verticalmente
    "justify-between", // Espaço entre a mensagem e o botão de fechar
    "gap-2", // Espaçamento entre elementos internos
    "shadow-lg", // Sombra
    "p-4", // Padding interno
    "right-10", // Posição à direita
    "bottom-10", // Posição na base
    "rounded-lg", // Bordas arredondadas
    "min-w-64", // Largura mínima
    "z-50", // Ordem de empilhamento (para ficar sobre outros elementos)
  ];
  switch (toastState.value.type) {
    case "Success":
      return [...baseClasses, "bg-green-600"];
    case "Error":
      return [...baseClasses, "bg-red-600"];
    case "Warning":
      return [...baseClasses, "bg-yellow-500"]; // Ou orange-500, ajuste conforme seu design system
    default:
      // Caso o tipo seja null ou não reconhecido, pode-se usar uma cor padrão ou não renderizar.
      // Como temos v-if="toastState.isVisible", ele não deve renderizar se type for null e isVisible for false.
      return [...baseClasses, "bg-gray-700"]; // Fallback
  }
});
</script>

<style></style>
