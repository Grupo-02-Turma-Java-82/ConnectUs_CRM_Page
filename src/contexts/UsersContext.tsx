import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Users } from "@/models/Users";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useNotifications } from "@/hooks/useNotifications";

type UsersContextData = {
  isLoading: boolean;
  users: Users[];
  addUsers: (data: UserFormData) => Promise<void>;
  updateUser: (id: number, data: UserFormData) => Promise<void>;
};

export const userFormSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
  foto: z.string().optional(),
  telefone: z
    .string()
    .min(10, "O telefone deve ter no mínimo 10 caracteres.")
    .optional(),
  cargo: z.string().min(1, "O cargo é obrigatório."),
});

export type UserFormData = z.infer<typeof userFormSchema>;

export const UsersContext = createContext({} as UsersContextData);

export function UsersProvider({ children }: { children: ReactNode }) {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const response = await api.get("/usuarios/all");

      setUsers(response.data ?? []);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error:", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível carregar os usuários."
        );
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function addUsers(data: UserFormData) {
    try {
      setIsLoading(true);

      await api.post("/usuarios/cadastrar", data);

      const createdAt = new Date();
      addNotification({
        id: uuidv4(),
        type: "Usuários",
        action: "Criado",
        message: `Usuário ${data.nome}, criado com sucesso!`,
        createdAt: createdAt.toISOString(),
        isRead: false,
      });

      toast.success("Usuario cadastrado com sucesso!");
      fetchUsers();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message || "Não foi possível cadastrar o usuário"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUser(id: number, data: UserFormData) {
    try {
      setIsLoading(true);

      await api.put(`/usuarios/atualizar/${id}`, data);

      const createdAt = new Date();
      addNotification({
        id: uuidv4(),
        type: "Usuários",
        action: "Atualizado",
        message: `Usuário ${data.nome}, atualizado com sucesso!`,
        createdAt: createdAt.toISOString(),
        isRead: false,
      });

      toast.success("Usuario atualizado com sucesso!");
      fetchUsers();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message || "Não foi possível atualizar o usuario."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        isLoading,
        users,
        addUsers,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
