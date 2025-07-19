// composables/usePersistedState.js
import { ref, watch } from "vue"; // Importe ref e watch do Vue
import { useState } from "#app"; // Importe useState do Nuxt

/**
 * Um composable para criar um estado reativo que é persistido no localStorage.
 * Funciona tanto em SSR quanto no cliente, persistindo apenas no cliente.
 *
 * @param {string} key A chave a ser usada no localStorage.
 * @param {Function} defaultValueFactory Uma função que retorna o valor inicial padrão.
 * @returns {Ref} Um ref reativo cujo valor é persistido.
 */
export function usePersistedState(key, defaultValueFactory) {
  // Use useState do Nuxt para garantir que o estado seja compartilhado entre SSR e cliente.
  // O valor inicial é obtido da função defaultValueFactory.
  const state = useState(key, defaultValueFactory);

  // Lógica de persistência no localStorage (apenas no lado do cliente)
  if (process.client) {
    // Tenta carregar o valor do localStorage na inicialização do cliente
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        state.value = JSON.parse(storedValue);
      }
    } catch (e) {
      console.error(`Erro ao carregar '${key}' do localStorage:`, e);
      // Se houver erro, usa o valor padrão
      state.value = defaultValueFactory();
    }

    // Observa mudanças no estado e salva no localStorage
    watch(
      state,
      (newValue) => {
        try {
          localStorage.setItem(key, JSON.stringify(newValue));
        } catch (e) {
          console.error(`Erro ao salvar '${key}' no localStorage:`, e);
        }
      },
      { deep: true }
    ); // Use deep: true se o estado for um objeto complexo
  }

  return state;
}
