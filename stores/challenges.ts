import { defineStore } from "pinia";

// Defina a interface para o objeto de desafio para garantir a tipagem correta
interface Challenge {
  id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  title: string;
  description: string;
  target_value: number;
  balance: number;
  user_id: number;
  active: boolean;
  completed: boolean;
}

export const useChallengeStore = defineStore("challenges", {
  state: (): Challenge => ({
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: null,
    title: "",
    description: "",
    target_value: 0,
    balance: 0,
    user_id: 0,
    active: true,
    completed: false,
  }),
  actions: {
    setChallenge(challenge: Partial<Challenge>) {
      Object.assign(this, challenge);
    },
  },
  getters: {
    isComplete: (state): boolean => state.balance >= state.target_value,
    progressPercentage: (state): number => {
      if (state.target_value === 0) return 0;
      return (state.balance / state.target_value) * 100;
    },
  },
  persist: true,
});
