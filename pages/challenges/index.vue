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
      :challenge-id="challenge.id"
      :balance="challenge.balance"
      :goal="challenge.goal"
      :title="challenge.title"
      :description="challenge.description"
      :handleNewAporte="() => handleNewAporte(challenge.id)"
      :handleDeleteChallenge="() => handleDeleteChallenge(challenge.id)"
    />
  </section>

  <MainModal
    action-type="delete"
    cancel-text="Cancelar"
    confirm-text="Excluir"
    title="Excluir Meta"
    content="Tem certeza que deseja excluir esta meta? Essa ação é irreversível"
    :active="modalDeleteActive"
    @close="modalDeleteActive = false"
    @save="handleConfirmDelete"
  />

  <MainModal
    action-type="save"
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
        class="py-2 px-4 rounded-lg text-sm border border-gray-400 w-full"
        @change="getValueAporte"
      />
    </form>
  </MainModal>
</template>

<script setup lang="ts">
// const { data } = await useFetch("https://jsonplaceholder.typicode.com/posts/");

// console.log(data.value);
interface Challenge {
  id: string;
  balance: number;
  goal: number;
  title: string;
  description: string;
}

const loading = useLoading();

const modalDeleteActive = ref(false);
const modalAddMoney = ref(false);
const aporteValue = ref<number | null>(null);
const challengeSelected = ref<string | null>(null);
const challengeToDelete = ref<string | null>(null);

const challenges = ref<Challenge[]>([
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
    goal: 5000,
    title: "Férias de verão",
    description:
      "Nunca é demais lembrar o peso e o significado destes problemas, uma vez que a valorização de fatores subjetivos desafia a capacidade de equalização de alternativas às soluções ortodoxas.",
  },
]);

const openModal = () => {
  loading.value = true;
};

const closeModal = () => {
  loading.value = false;
};

const handleNewAporte = (challengeId: string) => {
  handleAddMoney(challengeId);
};

const handleDeleteChallenge = (challengeId: string) => {
  challengeToDelete.value = challengeId;
  modalDeleteActive.value = true;
};

const handleConfirmDelete = () => {
  if (challengeToDelete.value) {
    challenges.value = challenges.value.filter(
      (challenge) => challenge.id !== challengeToDelete.value
    );
    console.log(`Challenge ${challengeToDelete.value} deleted`);
  }
  modalDeleteActive.value = false;
  challengeToDelete.value = null;
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
  challengeSelected.value = null;
};

const getValueAporte = (e: Event) => {
  aporteValue.value = parseFloat((e.target as HTMLInputElement).value);
};
</script>
