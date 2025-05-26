<template>
  <header class="flex items-center gap-10 justify-between">
    <h2 class="text-3xl font-bold flex-2/3">Minhas Metas</h2>
    <NuxtLink to="/challenges/new" class="flex-1">
      <Button
        text="Criar Nova Meta"
        icon-name="heroicons:plus"
        variant="primary"
      />
    </NuxtLink>
  </header>
  <p class="text-gray-700 mt-4">Acompanhe e gerencie suas metas financeiras</p>

  <section class="cards mt-10">
    <div class="card-challenge max-w-100 p-8 shadow rounded-xl bg-white">
      <h3 class="text-2xl font-bold">Férias de verão</h3>
      <span
        class="mb-3 block text-sm text-gray-700 line-clamp-2 overflow-hidden text-ellipsis whitespace-nowrap relative"
        >Nunca é demais lembrar o peso e o significado destes problemas, uma vez
        que a valorização de fatores subjetivos desafia a capacidade de
        equalização de alternativas às soluções ortodoxas.
      </span>
      <span class="block text-xl mb-2">Saldo: <strong>R$ 1200</strong></span>
      <span class="text-xs">Meta: R$ 2400,00</span>
      <div class="percentage bg-gray-200 h-3 rounded-xl mb-10">
        <span class="block w-50 rounded-xl h-3 bg-green-600"></span>
      </div>

      <div class="actions flex justify-end gap-6">
        <Button
          class="flex-3"
          text="Novo aporte"
          icon-name="heroicons:plus"
          variant="primary"
          @click="handleNewAporte()"
        />
        <PageLink text="Editar" class="flex-1">
          <Icon
            name="heroicons:pencil-square-16-solid"
            style="color: black"
            size="18"
          ></Icon>
        </PageLink>
        <Button
          class="flex-1"
          text="Excluir"
          icon-name="heroicons:trash"
          @click="handleDeleteChallenge()"
        />
      </div>
    </div>
  </section>

  <MainModal
    cancel-text="Cancelar"
    confirm-text="Confirmar"
    title="Excluir Meta"
    content="Tem certeza que deseja excluir esta meta? Essa ação é irreversível"
    :active="modalActive"
    @close="modalActive = false"
  />
</template>

<script setup lang="ts">
// const { data } = await useFetch("https://jsonplaceholder.typicode.com/posts/");

// console.log(data.value);

const modalActive = ref(false);

const handleNewAporte = () => {
  console.log("Novo aporte");
};

const handleDeleteChallenge = () => {
  console.log("Excluir challenge");
  modalActive.value = true;
};
</script>
