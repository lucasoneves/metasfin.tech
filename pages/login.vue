<script setup>
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

const loginWithGoogle = () => {
  // A URL de autenticação do Google
  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${config.public.googleClientId}&` +
    `redirect_uri=${encodeURIComponent(
      window.location.origin + "/auth/google/callback"
    )}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent("email profile")}&` + // Escopos que você pediu no Google Cloud Console
    `access_type=offline&` + // Opcional: para obter um refresh token (se seu backend precisar)
    `prompt=consent select_account`; // Garante que o usuário possa escolher a conta

  window.location.href = googleAuthUrl;
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login com Google</button>
  </div>
</template>
