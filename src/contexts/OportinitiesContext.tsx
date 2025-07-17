import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Oportunities } from "@/models/Oportunities";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type OportunitiesContextData = {
  isLoading: boolean;
  Oportunities: Oportunities[];
  deleteOportunities: (id: number) => Promise<void>;
};

export const OportunitiesContext = createContext({} as OportunitiesContextData);

export function OportunitiesProvider({ children }: { children: ReactNode }) {
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

  async function deleteOportunities(id: number) {
    try {
      setIsLoading(true);

      await api.delete(`/oportunidades/${id}`);
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

  useEffect(() => {
    fetchOportunities();
  }, []);

  return (
    <OportunitiesContext.Provider
      value={{
        isLoading,
        Oportunities,
        deleteOportunities,
      }}
    >
      {children}
    </OportunitiesContext.Provider>
  );
}
