<template>
  <header class="flex items-center gap-10 justify-between">
    <PageTitle content="Minhas Metas" class="flex-2/3" />
    <NuxtLink to="/challenges/new" class="flex-1">
      <Button
        text="Criar Nova Meta"
        icon-name="heroicons:plus"
        variant="primary"
      />
    </NuxtLink>
  </header>
  <PageDescription content="Acompanhe e gerencie suas metas financeiras" />

  <section class="cards flex gap-6 flex-wrap items-center w-full mt-10">
    <CardChallenge
      v-for="challenge in challenges"
      :key="challenge.id"
      :challengeId="challenge.id"
      :balance="challenge.balance"
      :goal="challenge.goal"
      :title="challenge.title"
      :description="challenge.description"
      :handleNewAporte="() => handleNewAporte(challenge.id)"
      :handleDeleteChallenge="() => handleDeleteChallenge(challenge.id)"
    />
  </section>

  <MainModal
    cancel-text="Cancelar"
    confirm-text="Confirmar"
    title="Excluir Meta"
    content="Tem certeza que deseja excluir esta meta? Essa ação é irreversível"
    :active="modalDeleteActive"
    @close="modalDeleteActive = false"
  />

  <MainModal
    cancel-text="Cancelar"
    confirm-text="Salvar"
    title="Novo aporte"
    content="Digite o valor do novo depósito"
    :active="modalAddMoney"
    @close="modalAddMoney = false"
    @save="handleSaveAporte"
  >
    <form action="" @submit="handleSaveAporte">
      <input
        type="number"
        placeholder="Valor"
        class="py-2 px-4 rounded-lg border border-gray-400 w-full"
        @change="getValueAporte"
      />
    </form>
  </MainModal>
</template>

<script setup lang="ts">
// const { data } = await useFetch("https://jsonplaceholder.typicode.com/posts/");

// console.log(data.value);

const modalDeleteActive = ref(false);
const modalAddMoney = ref(false);
const aporteValue = ref<number | null>(null);
const challengeSelected = ref<string | null>(null);

const challenges = ref([
  {
    id: "1",
    balance: 0,
    goal: 10000,
    title: "Mundial de Clubes 2025",
    description:
      "No mundo atual, a determinação clara de objetivos maximiza as possibilidades por conta do investimento em reciclagem técnica.",
  },
  {
    id: "2",
    balance: 0,
    goal: 10000,
    title: "Férias de verão",
    description:
      "Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a valorização de fatores subjetivos desafia a capacidade de equalização de alternativas às soluções ortodoxas.",
  },
]);

const handleNewAporte = (challengeId: string) => {
  handleAddMoney(challengeId);
};

const handleDeleteChallenge = (challengeId: string) => {
  console.log(`Delete challenge ${challengeId}`);
  modalDeleteActive.value = true;
};

const handleAddMoney = (challengeId: string) => {
  challengeSelected.value = challengeId;
  modalAddMoney.value = true;
};

const handleSaveAporte = () => {
  if (aporteValue.value !== null) {
    challenges.value = challenges.value.map((challenge) => {
      if (
        challenge.id === challengeSelected.value &&
        aporteValue.value !== null
      ) {
        challenge.balance += aporteValue.value;
      }
      return challenge;
    });
    modalAddMoney.value = false;
    aporteValue.value = null;
  }
};

const getValueAporte = (e: Event) => {
  aporteValue.value = parseFloat((e.target as HTMLInputElement).value);
};
</script>
