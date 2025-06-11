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
      :goal="challenge.value"
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
const {
  data: challenges,
  pending,
  error,
} = await useFetch<Challenge[]>("http://localhost:8080/api/goals");

// console.log(data.value);
interface Challenge {
  // Campos do gorm.Model (renomeados no JSON)
  id: number; // O ID em Go é 'uint', que é um número. No JSON será um número.
  created_at: string; // `time.Time` em Go geralmente vem como string ISO 8601 no JSON
  updated_at: string; // `time.Time` em Go geralmente vem como string ISO 8601 no JSON
  deleted_at: string | null; // Pode ser null se não for soft-deletado, ou uma string
  // Seus campos
  title: string;
  description: string;
  value: number; // Use 'value' se a API retornar 'value', ou 'goal' se o frontend mapear
  balance: number;
  user_id: number; // UserID em Go é 'uint', que é um número. No JSON será um número.
}
const loading = useLoading();

const modalDeleteActive = ref(false);
const modalAddMoney = ref(false);
const aporteValue = ref<number | null>(null);
const challengeSelected = ref<number | null>(null);
const challengeToDelete = ref<number | null>(null);

const userChallenges = ref<Challenge[]>([]);

const openModal = () => {
  loading.value = true;
};

const closeModal = () => {
  loading.value = false;
};

const handleNewAporte = (challengeId: number) => {
  handleAddMoney(challengeId);
};

const handleDeleteChallenge = (challengeId: number) => {
  challengeToDelete.value = challengeId;
  modalDeleteActive.value = true;
};

const handleConfirmDelete = () => {
  if (challengeToDelete.value) {
    userChallenges.value = userChallenges.value.filter(
      (challenge) => challenge.id !== challengeToDelete.value
    );
    console.log(`Challenge ${challengeToDelete.value} deleted`);
  }
  modalDeleteActive.value = false;
  challengeToDelete.value = null;
};

const handleAddMoney = (challengeId: number) => {
  challengeSelected.value = challengeId;
  modalAddMoney.value = true;
};
const handleSaveAporte = () => {
  if (aporteValue.value !== null) {
    challenges.value = userChallenges.value.map((challenge) => {
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

console.log(challenges);
</script>
