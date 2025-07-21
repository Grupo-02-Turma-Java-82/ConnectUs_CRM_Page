import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Oportunities } from "@/models/Oportunities";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import z from "zod";
import { useNotifications } from "@/hooks/useNotifications";
import { v4 as uuidv4 } from "uuid";

type OportunitiesContextData = {
  isLoading: boolean;
  Oportunities: Oportunities[];
  deleteOportunities: (id: number) => Promise<void>;
  addOpportunities: (data: OpportunitiesFormData) => Promise<void>;
  updateOpportunities: (data: OpportunitiesFormData) => Promise<void>;
};

export const opportunityStatus = [
  "NOVA",
  "EM_NEGOCIACAO",
  "GANHA",
  "PERDIDA",
  "ARQUIVADA",
] as const;

export const formSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório."),
  descricao: z.string().optional(),
  valorEstimado: z.coerce
    .number()
    .min(0, "O valor estimado não pode ser negativo."),
  status: z.enum(opportunityStatus),
  usuario: z.object({
    id: z.coerce.number({
      required_error: "Selecione um usuário responsável.",
    }),
  }),
  cliente: z.object({
    id: z.coerce.number({ required_error: "Selecione um cliente." }),
  }),
});

type OpportunitiesFormData = z.infer<typeof formSchema>;

export const OportunitiesContext = createContext({} as OportunitiesContextData);

export function OportunitiesProvider({ children }: { children: ReactNode }) {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [Oportunities, setOportunities] = useState<Oportunities[]>([]);

  async function fetchOportunities() {
    try {
      setIsLoading(true);
      const response = await api.get("/oportunidades");

      setOportunities(response.data ?? []);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error:", e.response?.data.message);
        toast.error(
          e.response?.data.message ||
            "Não foi possível carregar as oportunidades."
        );
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function addOpportunities(data: OpportunitiesFormData) {
    try {
      setIsLoading(true);

      await api.post("/oportunidades", data);

      const createdAt = new Date();
      addNotification({
        id: uuidv4(),
        type: "Oportunidades",
        action: "Criado",
        message: `Oportunidade ${data.titulo}, criada com sucesso!`,
        createdAt: createdAt.toISOString(),
        isRead: false,
      });

      toast.success("Oportunidade cadastrada com sucesso!");
      fetchOportunities();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message ||
            "Não foi possível cadastrar a oportunidade"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteOportunities(id: number) {
    try {
      setIsLoading(true);

      await api.delete(`/oportunidades/${id}`);

      const createdAt = new Date();
      addNotification({
        id: uuidv4(),
        type: "Oportunidades",
        action: "Deletado",
        message: `Oportunidade com o id ${id}, deletada com sucesso!`,
        createdAt: createdAt.toISOString(),
        isRead: false,
      });

      toast.success("Oportunidade deletada com sucesso!");
      fetchOportunities();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message ||
            "Não foi possível excluir a oportunidade."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function updateOpportunities(data: OpportunitiesFormData) {
    try {
      setIsLoading(true);

      await api.put(`/oportunidades`, data);

      const createdAt = new Date();
      addNotification({
        id: uuidv4(),
        type: "Oportunidades",
        action: "Atualizado",
        message: `Oportunidade ${data.titulo}, atualizada com sucesso!`,
        createdAt: createdAt.toISOString(),
        isRead: false,
      });

      toast.success("Oportunidade atualizada com sucesso!");
      fetchOportunities();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message ||
            "Não foi possível atualizar a oportunidade."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOportunities();
  }, []);

  return (
    <OportunitiesContext.Provider
      value={{
        isLoading,
        Oportunities,
        deleteOportunities,
        addOpportunities,
        updateOpportunities,
      }}
    >
      {children}
    </OportunitiesContext.Provider>
  );
}
