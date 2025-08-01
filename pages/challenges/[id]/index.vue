<template v-if="newChallenge.title">
  <PageTitle :content="`${newChallenge.title}`" />
  <PageDescription
    content="Visualize e edite os detalhes da sua meta financeira. Acompanhe seu progresso e faça os ajustes necessários."
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
      <label for="description" class="text-sm font-bold">Descrição</label>
      <textarea
        id="description"
        rows="4"
        type="text"
        placeholder="Exemplo: Viagem de férias para a praia com duração de 30 dias"
        v-model="newChallenge.description"
        class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
      />
    </div>
    <div class="flex gap-4">
      <div class="form-field flex-1">
        <label for="balance" class="text-sm font-bold">Saldo atual</label>
        <input
          id="balance"
          type="text"
          placeholder="R$ 0,00"
          v-model="formattedBallance"
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </div>
      <div class="form-field flex-1">
        <label for="target" class="text-sm font-bold">Valor da meta</label>
        <input
          id="target"
          type="text"
          placeholder="R$ 0,00"
          v-model="formattedValue"
          class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
        />
      </div>
    </div>

    <footer class="flex gap-4 justify-end w-full mt-4">
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
definePageMeta({
  middleware: "auth",
  title: "Editar Meta",
});
const authStore = useAuthStore();
const route = useRoute();
const challengeId = route.params.id;
const loading = useLoading();
const config = useRuntimeConfig();
const { showToast } = useToast();

const newChallenge = ref<Challenge>({
  active: true,
  balance: 0,
  completed: false,
  created_at: "",
  deleted_at: null,
  description: "",
  id: 0,
  target_value: 0,
  title: "",
  updated_at: "",
  user_id: 0,
});
loading.value = true;

onMounted(async () => {
  try {
    const data = await $fetch<Challenge>(
      `${config.public.apiBaseUrl}/goals/${challengeId}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (data) {
      newChallenge.value = data;
    }
  } catch (error) {
    console.error("Erro ao buscar a meta:", error);
  } finally {
    loading.value = false;
  }
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

const handleSaveChallenge = async (e: Event) => {
  e.preventDefault();

  const loading = useLoading();
  const { showToast } = useToast();

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
    const { error } = await useFetch(
      `${config.public.apiBaseUrl}/goals/${challengeId}`,
      {
        method: "PUT",
        body: newChallenge.value,
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (error.value) {
      console.error("Erro ao salvar a meta:", error.value);
      showToast(
        `Erro ao salvar a meta: ${
          error.value.data?.message || error.value.statusMessage
        }`,
        "Error"
      );
    } else {
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
</script>
