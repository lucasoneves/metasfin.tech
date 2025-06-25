<template>
  <PageTitle :content="`Detalhe do challenge: ${challengeId}`" />
  <PageDescription
    content="Visualize e edite os detalhes da sua meta financeira. Acompanhe seu progresso e faça os ajustes necessários."
  />
  <form
    action="#"
    class="mt-10 flex gap-4 flex-col w-8/12"
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
    <div class="form-field">
      <label for="value" class="text-sm font-bold">Valor da meta</label>
      <input
        id="value"
        type="text"
        placeholder="R$ 0,00"
        v-model="formattedValue"
        class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
      />
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
const route = useRoute();
const challengeId = route.params.id;

const newChallenge = ref<Challenge>({
  title: "",
  description: "",
  target_value: 0,
  balance: 0,
  user_id: 0,
  active: true,
  completed: false,
});

const formattedValue = computed({
  get() {
    if (!newChallenge.value.target_value) {
      return "";
    }
    // Formata o número para o padrão de moeda brasileiro.
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(newChallenge.value.target_value);
  },
  set(newValue: string) {
    // Remove todos os caracteres que não são dígitos para obter apenas os números.
    const digitsOnly = newValue.replace(/\D/g, "");
    // Converte a string de dígitos para número e divide por 100 para tratar os centavos.
    // Se não houver dígitos, o valor será 0.
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
      `http://localhost:8080/api/goals/${challengeId}`,
      {
        method: "PUT",
        body: newChallenge.value,
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

try {
  const {
    data: challenge,
    pending,
    status,
    error,
    refresh,
  } = await useFetch<Challenge>(
    `http://localhost:8080/api/goals/${challengeId}`
  );

  if (status.value === "success") {
    newChallenge.value = challenge.value as Challenge;
  }
} catch (error) {}
</script>
