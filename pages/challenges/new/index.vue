<template>
  <PageTitle content="Adicionar nova meta" />
  <PageDescription
    content="Defina aqui os detalhes da sua nova meta financeira e comece a poupar para
    seus objetivos."
  />
  <form
    action="#"
    class="mt-10 flex gap-4 flex-col w-8/12"
    @submit="handleSaveChallenge"
  >
    <input
      type="text"
      placeholder="Título da meta"
      v-model="newChallenge.challengeTitle"
      class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
    />
    <textarea
      type="text"
      placeholder="Descrição"
      v-model="newChallenge.challengeDescription"
      class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
    />
    <input
      type="number"
      placeholder="Valor da meta"
      v-model.number="newChallenge.challengeValue"
      class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
    />

    <footer class="flex gap-4 justify-end w-full mt-4">
      <Button
        text="Limpar formulário"
        @click="() => handleClearForm"
        variant="secondary"
        class="flex-1 max-w-[220px]"
      ></Button>
      <Button
        text="Salvar"
        @click="() => handleSaveChallenge"
        variant="primary"
        class="flex-1 max-w-[220px]"
      ></Button>
    </footer>
  </form>
</template>

<script setup lang="ts">
const id = ref(0);

interface ChallengeForm {
  challengeTitle: string;
  challengeDescription: string;
  challengeValue: number;
}

const newChallenge = ref<ChallengeForm>({
  challengeTitle: "",
  challengeDescription: "",
  challengeValue: 0,
});

const handleSaveChallenge = (e: Event) => {
  e.preventDefault();
  // Aqui você adicionaria a lógica para enviar os dados para um backend ou store
  console.log("Nova meta a ser salva:", newChallenge.value);
  // Exemplo: Redirecionar para a lista de desafios após salvar
  handleClearForm();
};

const handleClearForm = () => {
  newChallenge.value = {
    challengeTitle: "",
    challengeDescription: "",
    challengeValue: 0,
  };
};
</script>

<style lang="scss" scoped></style>
