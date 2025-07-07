import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import type { Customer } from "@/models/Customers";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type CustomersContextData = {
  isLoading: boolean;
  customers: Customer[];
  page: number;
  totalOfPage: number;
  setPage: (page: number) => void;
  deleteCustomer: (id: number) => Promise<void>;
}; 

export const CustomersContext = createContext({} as CustomersContextData);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [totalOfPage, setTotalOfPage] = useState(0);

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/clientes?pagina=${page}&tamanho=10&ordenarPor=id&direcao=asc`
      );

      setCustomers(response.data.content ?? []);
      setTotalOfPage(response.data.totalPages ?? 0);

      toast.dark("Clientes carregados com sucesso");
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error:", e.response?.data.message);
        toast.error(
          e.response?.data.message || "Não foi possível carregar os clientes."
        );
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  async function deleteCustomer(id: number) {
    try {
      setIsLoading(true);

      await api.delete(`/clientes/${id}`);
      fetchCustomers();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message || "Não foi possível excluir o cliente."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <CustomersContext.Provider
      value={{
        isLoading,
        customers,
        page,
        totalOfPage,
        setPage,
        deleteCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}
