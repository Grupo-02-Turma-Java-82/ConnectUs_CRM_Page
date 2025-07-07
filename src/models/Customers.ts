export type Customer = {
  id?: number;
  nome: string;
  email: string;
  foto: string;
  telefone: string;
  tipoPessoa: "FISICA" | "JURIDICA";
  cpf?: string;
  cnpj?: string;
  leadScore: number;
  updatedAt: Date;
};
