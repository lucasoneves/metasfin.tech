const { showToast } = useToast();
const config = useRuntimeConfig();
const authStore = useAuthStore();

interface ChallengeDetailType {
  id?: number;
}

export const useFetchChallenge = async (challengeId: ChallengeDetailType) => {
  const { data: fetchedChallenge, error } = await useFetch<Challenge>(
    `${config.public.apiBaseUrl}/goals/${challengeId}`,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    }
  );

  if (error.value) {
    console.error("Erro ao buscar a meta:", error.value);
    showToast(
      `Erro ao buscar a meta: ${
        error.value.data?.message || error.value.statusMessage
      }`,
      "Error"
    );
  } else if (fetchedChallenge.value) {
    console.log("Meta encontrada:", fetchedChallenge.value);
    return fetchedChallenge.value;
  } else {
    showToast("Nenhuma meta encontrada.", "Warning");
  }
};
