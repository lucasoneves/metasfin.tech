<template>
  <header class="flex items-center gap-10">
    <PageTitle content="Minhas Metas" class="flex-1" />
    <NuxtLink to="/challenges/new" class="flex-1 flex justify-end">
      <Button
        text="Criar Nova Meta"
        icon-name="heroicons:plus"
        variant="primary"
        class="max-w-[220px]"
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
      :goal="challenge.target_value"
      :title="challenge.title"
      :description="challenge.description"
      :handleNewAporte="() => challenge.id && handleNewAporte(challenge.id)"
      :handleDeleteChallenge="
        () => challenge.id && handleDeleteChallenge(challenge.id)
      "
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
    <form @submit.prevent="handleSaveAporte">
      <input
        type="text"
        v-model="formattedValue"
        placeholder="Valor"
        class="py-2 px-4 rounded-lg text-sm border border-gray-400 w-full"
      />
      <button type="submit" class="hidden"></button>
      <!-- Para permitir submit com Enter -->
    </form>
  </MainModal>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const authStore = useAuthStore();
const config = useRuntimeConfig();
const {
  data: challenges,
  pending,
  error,
  refresh,
} = await useFetch<Challenge[]>(`${config.public.apiBaseUrl}/goals`, {
  headers: {
    Authorization: `Bearer ${authStore.token}`,
  },
});
const loading = useLoading();
const { showToast } = useToast();

onMounted(async () => {
  await refresh();
});
const modalDeleteActive = ref(false);
const modalAddMoney = ref(false);
const aporteValue = ref<number>(0);
const challengeSelected = ref<number | null>(null);
const challengeToDelete = ref<number | null>(null);

const handleNewAporte = (challengeId: number) => {
  handleAddMoney(challengeId);
};

const handleDeleteChallenge = (challengeId: number) => {
  challengeToDelete.value = challengeId;
  modalDeleteActive.value = true;
};

const handleConfirmDelete = async () => {
  loading.value = true;
  modalDeleteActive.value = false;
  const id = challengeToDelete.value;
  try {
    if (challengeToDelete.value) {
      const { error, pending } = await useFetch(
        `${config.public.apiBaseUrl}/goals/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      if (error.value) {
        showToast("Erro ao deletar a meta", "Error");
      } else {
        showToast("Meta deletada com sucesso!", "Success");
      }
    }
  } catch (error) {
    console.log("Erro ao deletar a meta:", error);
    showToast("Erro ao deletar a meta", "Error");
  } finally {
    await refresh();
    loading.value = false;
  }

  challengeToDelete.value = null;
};

const handleAddMoney = (challengeId: number) => {
  challengeSelected.value = challengeId;
  modalAddMoney.value = true;
  console.log(challengeId);
};

const handleSaveAporte = async () => {
  if (aporteValue.value === null || aporteValue.value <= 0) {
    showToast("Por favor, insira um valor de aporte válido.", "Error");
    return;
  }

  if (challengeSelected.value === null) {
    showToast("Erro: Nenhuma meta selecionada para o aporte.", "Error");
    modalAddMoney.value = false; // Fecha o modal se o estado estiver inconsistente
    return;
  }

  loading.value = true;
  const goalId = challengeSelected.value;
  const amount = aporteValue.value;

  try {
    // ATENÇÃO: Verifique se este é o endpoint correto para adicionar fundos/aporte.
    // Exemplo: POST /api/goals/{goalId}/deposit ou /api/goals/{goalId}/add-money
    const { error: fetchError } = await useFetch(
      `${config.public.apiBaseUrl}/goals/deposit/${goalId}`,

      {
        method: "POST",
        body: { amount }, // A API deve esperar um corpo como { "amount": valor }
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (fetchError.value) {
      console.error("Erro ao salvar aporte:", fetchError.value);
      const errorMessage =
        fetchError.value.data?.message || // Tenta pegar msg de erro da API
        fetchError.value.message ||
        "Erro ao salvar o aporte. Tente novamente.";
      showToast(errorMessage, "Error");
    } else {
      showToast("Aporte salvo com sucesso!", "Success");
      modalAddMoney.value = false; // Fecha o modal, o watch cuidará da limpeza
      await refresh(); // Atualiza a lista de metas
    }
  } catch (err) {
    console.error("Erro inesperado ao processar o aporte:", err);
    showToast(
      "Ocorreu um erro inesperado. Por favor, tente novamente.",
      "Error"
    );
  } finally {
    loading.value = false;
  }
};

const formattedValue = computed({
  get() {
    if (!aporteValue.value) {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(aporteValue.value);
  },
  set(newValue: string) {
    const digitsOnly = newValue.replace(/\D/g, "");
    aporteValue.value = Number(digitsOnly) / 100;
  },
});

watch(modalAddMoney, (isModalActive: boolean) => {
  if (!isModalActive) {
    aporteValue.value = 0;
    challengeSelected.value = null;
  }
});
</script>
