<template>
  <div class="card-challenge max-w-100 w-full p-8 shadow rounded-xl bg-white">
    <h3 class="text-2xl font-bold">{{ title }}</h3>
    <span
      class="mb-3 block text-sm text-gray-700 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap relative"
      >{{ description }}
    </span>
    <span class="block text-xl mb-2"
      >Saldo:
      <strong class="text-xl">{{ formatCurrencyBr(balance) }}</strong></span
    >
    <span class="text-xs text-gray-700 mb-1 block"
      >Meta: {{ formatCurrencyBr(goal) }}</span
    >
    <div class="percentage w-full bg-gray-200 h-3 rounded-xl mb-10">
      <div :style="progressStyle" class="h-full rounded-xl bg-green-600"></div>
    </div>

    <div class="actions flex justify-end gap-6">
      <Button
        class="flex-3"
        text="Novo aporte"
        icon-name="heroicons:plus"
        variant="primary"
        @click="handleNewAporte"
      />
      <PageLink :path="challengeId" text="Editar" class="flex-1">
        <Icon
          name="heroicons:pencil-square-16-solid"
          style="color: black"
          size="18"
        ></Icon>
      </PageLink>
      <Button
        class="flex-1"
        text="Excluir"
        icon-name="heroicons:trash"
        @click="handleDeleteChallenge"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  challengeId: number;
  title: string;
  description: string;
  balance: number;
  goal: number;
  handleNewAporte: () => void;
  handleDeleteChallenge: () => void;
}

const props = defineProps<Props>();

const progressStyle = computed(() => {
  const percentage = Math.min((props.balance / props.goal) * 100, 100);
  if (props.goal <= 0 || props.balance < 0) {
    return { width: "0%" };
  }
  return { width: `${percentage}%` };
});
</script>

<style lang="scss" scoped></style>
