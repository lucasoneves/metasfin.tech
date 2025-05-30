// Em um composable (ex: composables/useMyCounter.ts) ou diretamente em um setup de página/componente
export const useMyCounter = () => useState<number>("myCounter", () => 0);
