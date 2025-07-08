import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Users } from "@/models/Users";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type UsersContextData = {
  isLoading: boolean;
  users: Users[];
};

export const UsersContext = createContext({} as UsersContextData);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);

  async function fetchUsers() {
    try {
      setIsLoading(true);
      const response = await api.get("/usuarios/all");

      setUsers(response.data ?? []);

      toast.dark("Usuários carregados com sucesso");
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
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        isLoading,
        users,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
