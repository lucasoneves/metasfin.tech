<script setup>
import { useRuntimeConfig } from '#app'
import { useRouter, useRoute } from 'vue-router' // Importe useRoute
import { useAuthStore } from '~/stores/auth'

const route = useRoute() // Obtenha o objeto de rota
const router = useRouter()
const config = useRuntimeConfig()
const authStore = useAuthStore()

const handleGoogleCallback = async () => {
  const code = route.query.code // <-- Extraindo o código
  const state = route.query.state // Opcional: extrair o state para verificação de CSRF

  if (!code) {
    console.error('Código de autorização não encontrado.')
    router.push('/login')
    return
  }

  try {
    // Envia o código para o seu backend Go
    // A API do seu backend em Go espera o 'code' na query string
    const response = await fetch(`${config.public.apiBaseUrl}/auth/google/callback?code=${code}&state=${state || ''}`, {
      method: 'GET', // Sua rota Gin é GET para este endpoint
      headers: {
        'Content-Type': 'application/json',
      },
      // Não envie body para requisição GET
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro na resposta do backend:', errorData)
      throw new Error(errorData.error || 'Falha na autenticação com o Google via backend.')
    }

    const data = await response.json()
    console.log('Autenticação backend bem-sucedida:', data)

    // Armazena o token e as informações do usuário usando o Pinia store
    authStore.setToken(data.token)
    authStore.setUser(data.user) // Se o backend retornar informações do usuário
    
    // Redireciona para a dashboard
    router.push('/dashboard')

  } catch (error) {
    console.error('Erro ao autenticar com o Google via backend:', error.message)
    router.push('/login?error=google_auth_failed')
  }
}

// Chama a função ao montar o componente
onMounted(() => {
  handleGoogleCallback()
})
</script>

<template>
  <div>
    <p>Autenticando com o Google...</p>
    </div>
</template>