<template>
  <header
    v-if="authStore.isAuthenticated"
    class="bg-white shadow w-full h-16 flex justify-between items-center"
  >
    <section
      class="max-w-6xl mx-auto flex flex-1 justify-between items-center p-4 gap-12"
    >
      <h1 class="text-black">
        <NuxtLink to="/"> metasfin.tech</NuxtLink>
      </h1>

      <nav class="flex-1 flex justify-end items-center">
        <ul class="flex gap-10">
          <li class="text-sm">
            <NuxtLink to="/challenges">Metas</NuxtLink>
          </li>
        </ul>
      </nav>

      <div
        v-if="authStore.user"
        class="user-settings flex items-center gap-4 relative cursor-pointer"
        @click="handleUserSettings('user-settings')"
      >
        <span class="text-xs">{{ authStore.user.username }}</span>
        <img src="/images/user_avatar.png" alt="User avatar" width="26" />

        <div
          v-if="boxUserSettings"
          class="user-settings-box absolute right-0 top-10 bg-white shadow-sm rounded-lg p-4 w-48"
        >
          <ul>
            <li class="py-2 px-4 hover:bg-gray-100 cursor-pointer text-xs">
              <NuxtLink to="/profile">Editar perfil</NuxtLink>
            </li>
            <li
              class="py-2 px-4 hover:bg-gray-100 cursor-pointer text-xs"
              @click="authStore.logout()"
            >
              Sair
            </li>
          </ul>
        </div>
      </div>
    </section>
  </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const emit = defineEmits(["open-user-settings"]);
const boxUserSettings = ref(false);

const handleUserSettings = (payload: string) => {
  boxUserSettings.value = !boxUserSettings.value;
};
</script>
