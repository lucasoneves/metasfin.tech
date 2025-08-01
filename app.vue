<template>
  <Header />
  <NuxtRouteAnnouncer />
  <div class="max-w-6xl mx-auto px-4 py-12">
    <NuxtPage />
  </div>
  <Loading :visible="loading" />
  <Toast />
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});
const loading = useLoading();
const authStore = useAuthStore();
const router = useRouter();
watch(
  () => authStore.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated) {
      router.push("/sign-in");
    }
  }
);
</script>
<style></style>
