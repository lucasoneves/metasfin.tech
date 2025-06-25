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
      <label for="" class="text-sm font-bold">Valor da meta</label>
      <input
        type="text"
        placeholder="R$ 0,00"
        v-model="formattedValue"
        class="py-3 px-4 rounded-lg bg-white border text-sm border-gray-300 w-full"
      />
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
      <!-- O @click foi removido do botão Salvar, pois type="submit" acionará o @submit do formulário -->
    </footer>
  </form>
</template>

<script setup lang="ts">
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
  e.preventDefault(); // Prevenir o comportamento padrão do formulário primeiro

  const loading = useLoading(); // Assumindo que useLoading() retorna uma ref para o estado de loading global
  const { showToast } = useToast();

  if (newChallenge.value.title.trim() === "") {
    showToast("Por favor, preencha o título da meta.", "Error");
    return;
  }

  if (newChallenge.value.target_value <= 0) {
    showToast("O valor da meta deve ser maior que 0.", "Error");
    return;
  }

  loading.value = true; // Ativar o loading ANTES da requisição

  try {
    const { error } = await useFetch(
      // Não precisamos desestruturar 'data' ou 'pending' se não forem usados diretamente aqui
      "http://localhost:8080/api/goals",
      {
        method: "POST",
        body: newChallenge.value,
      }
    );

    if (error.value) {
      // Tratar o erro, talvez mostrar uma notificação para o usuário
      console.error("Erro ao salvar a meta:", error.value);
      showToast(
        `Erro ao salvar a meta: ${
          error.value.data?.message || error.value.statusMessage
        }`,
        "Error"
      );
    } else {
      // Se não houver erro, limpar o formulário e redirecionar
      handleClearForm();
      showToast("Meta salva com sucesso!", "Success");
      await navigateTo("/challenges"); // Redirecionar para a lista de metas
    }
  } catch (err) {
    // Capturar outros erros inesperados (ex: problemas de rede, erros no try block)
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
