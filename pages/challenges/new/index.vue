<template>
  <PageTitle content="Adicionar nova meta" />
  <PageDescription
    content="Defina aqui os detalhes da sua nova meta financeira e comece a poupar para
    seus objetivos."
  />
  <form
    action="#"
    class="mt-10 flex gap-4 flex-col w-full md:w-8/12"
    @submit="handleSaveChallenge"
  >
    <div class="form-field">
      <label for="title" class="text-sm font-bold">Título da meta</label>
      <input
        id="title"
        type="text"
        placeholder="Exemplo: Viagem de férias"
        v-model="newChallenge.title"
        class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
      />
    </div>
    <div class="form-field">
      <label for="title" class="text-sm font-bold">Descrição</label>
      <textarea
        rows="4"
        type="text"
        placeholder="Exemplo: Viagem de férias para a praia com duração de 30 dias"
        v-model="newChallenge.description"
        class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
      />
    </div>

    <div class="flex gap-4">
      <div class="form-field flex-1">
        <label for="" class="text-sm font-bold">Saldo atual</label>
        <input
          type="text"
          placeholder="R$ 0,00"
          v-model="formattedBallance"
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </div>
      <div class="form-field flex-1">
        <label for="" class="text-sm font-bold">Valor da meta</label>
        <input
          type="text"
          placeholder="R$ 0,00"
          v-model="formattedValue"
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </div>
    </div>

    <footer class="flex gap-4 justify-end w-full mt-4">
      <Button
        text="Limpar formulário"
        @click="handleClearForm"
        variant="secondary"
        class="flex-1 max-w-[220px]"
        type="button"
      ></Button>
      <Button
        text="Salvar"
        type="submit"
        variant="primary"
        class="flex-1 max-w-[220px]"
      ></Button>
    </footer>
  </form>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const newChallenge = ref<Challenge>({
  title: "",
  description: "",
  target_value: 0,
  balance: 0,
  user_id: 1,
  active: true,
  completed: false,
});

const formattedValue = computed({
  get() {
    if (!newChallenge.value.target_value) {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newChallenge.value.target_value);
  },
  set(newValue: string) {
    const digitsOnly = newValue.replace(/\D/g, "");
    newChallenge.value.target_value = Number(digitsOnly) / 100;
  },
});

const formattedBallance = computed({
  get() {
    if (!newChallenge.value.balance) {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newChallenge.value.balance);
  },
  set(newValue: string) {
    const digitsOnly = newValue.replace(/\D/g, "");
    newChallenge.value.balance = Number(digitsOnly) / 100;
  },
});

const handleSaveChallenge = async (e: Event) => {
  e.preventDefault();

  const loading = useLoading();
  const { showToast } = useToast();
  const config = useRuntimeConfig();

  if (newChallenge.value.title.trim() === "") {
    showToast("Por favor, preencha o título da meta.", "Error");
    return;
  }

  if (newChallenge.value.target_value <= 0) {
    showToast("O valor da meta deve ser maior que 0.", "Error");
    return;
  }

  loading.value = true;

  try {
    const { error } = await useFetch(`${config.public.apiBaseUrl}/goals`, {
      method: "POST",
      body: newChallenge.value,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (error.value) {
      console.error("Erro ao salvar a meta:", error.value);
      showToast(
        `Erro ao salvar a meta: ${
          error.value.data?.message || error.value.statusMessage
        }`,
        "Error"
      );
    } else {
      handleClearForm();
      showToast("Meta salva com sucesso!", "Success");
      await navigateTo("/challenges");
    }
  } catch (err) {
    console.error("Ocorreu um erro inesperado ao tentar salvar a meta:", err);
    showToast("Ocorreu um erro inesperado.", "Error");
  } finally {
    loading.value = false;
  }
};

const handleClearForm = () => {
  newChallenge.value = {
    title: "",
    description: "",
    target_value: 0,
    balance: 0,
    user_id: 1,
    active: true,
    completed: false,
  };
};
</script>

<style lang="scss" scoped></style>
