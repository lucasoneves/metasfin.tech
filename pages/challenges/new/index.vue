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
        type="number"
        placeholder="Valor da meta"
        v-model.number="newChallenge.value"
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
interface Challenge {
  // Campos do gorm.Model (renomeados no JSON)
  id?: number; // O ID em Go é 'uint', que é um número. No JSON será um número.
  created_at?: string; // `time.Time` em Go geralmente vem como string ISO 8601 no JSON
  updated_at?: string; // `time.Time` em Go geralmente vem como string ISO 8601 no JSON
  deleted_at?: string | null; // Pode ser null se não for soft-deletado, ou uma string
  // Seus campos
  title: string;
  description: string;
  value: number; // Use 'value' se a API retornar 'value', ou 'goal' se o frontend mapear
  balance: number;
  user_id: number; // UserID em Go é 'uint', que é um número. No JSON será um número.
  active: boolean;
  completed: boolean;
}

const newChallenge = ref<Challenge>({
  title: "",
  description: "",
  value: 0,
  balance: 0,
  user_id: 1,
  active: true,
  completed: false,
});

const handleSaveChallenge = async (e: Event) => {
  e.preventDefault(); // Prevenir o comportamento padrão do formulário primeiro

  const loading = useLoading(); // Assumindo que useLoading() retorna uma ref para o estado de loading global
  const { showToast } = useToast();

  if (newChallenge.value.title.trim() === "") {
    showToast("Por favor, preencha o título da meta.", "Error");
    return;
  }

  if (newChallenge.value.value <= 0) {
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
    value: 0,
    balance: 0,
    user_id: 1,
    active: true,
    completed: false,
  };
};
</script>

<style lang="scss" scoped></style>
