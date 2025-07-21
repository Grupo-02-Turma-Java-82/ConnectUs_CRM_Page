import type { Customer } from "./Customers";
import type { Users } from "./Users";

export type Oportunities = {
  id: number;
  titulo: string;
  descricao: string;
  valorEstimado: number;
  status: "NOVA" | "EM_NEGOCIACAO" | "GANHA" | "PERDIDA" | "ARQUIVADA";
  dataCricao: Date;
  usuario: Users;
  cliente: Customer;
  dataCriacao: Date;
};
