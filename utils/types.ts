export interface Challenge {
  // Campos do gorm.Model (renomeados no JSON)
  id?: number; // O ID em Go é 'uint', que é um número. No JSON será um número.
  created_at?: string; // `time.Time` em Go geralmente vem como string ISO 8601 no JSON
  updated_at?: string; // `time.Time` em Go geralmente vem como string ISO 8601 no JSON
  deleted_at?: string | null; // Pode ser null se não for soft-deletado, ou uma string
  // Seus campos
  title: string;
  description: string;
  target_value: number; // Use 'value' se a API retornar 'value', ou 'goal' se o frontend mapear
  balance: number;
  user_id: number; // UserID em Go é 'uint', que é um número. No JSON será um número.
  active: boolean;
  completed: boolean;
}
