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

type CustomersContextData = {
  isLoading: boolean;
  customers: Customer[];
  page: number;
  totalOfPage: number;
  setPage: (page: number) => void;
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
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error("API Error:", e.response?.data.message);
        return;
      }
      console.error("Não foi possível carregar os clientes.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

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
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}
