export type Notification = {
  id: string;
  type: "Clientes" | "Oportunidades" | "Usuários";
  action: "Criado" | "Atualizado" | "Deletado";
  message: string;
  createdAt: string;
  isRead: boolean;
};
