<template>
  <header v-if="authStore.isAuthenticated" class="bg-white shadow w-full">
    <section
      class="max-w-6xl mx-auto flex justify-between items-center p-4 gap-12"
    >
      <h1 :class="$style.title">
        <NuxtLink to="/"> metasfin.tech</NuxtLink>
      </h1>

      <nav class="flex-1 flex justify-end items-center">
        <ul class="flex gap-10">
          <li class="text-sm">
            <NuxtLink to="/challenges">Metas</NuxtLink>
          </li>
        </ul>
      </nav>

      <div v-if="authStore.user" class="user-settings flex items-center gap-4">
        <span class="text-xs">{{ authStore.user.username }}</span>
        <img src="/images/user_avatar.png" alt="User avatar" width="40" />
      </div>
    </section>
  </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>

<style module>
.title {
  color: black;
}
</style>
