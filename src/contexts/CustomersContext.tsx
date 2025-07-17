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
import { z } from "zod";

type CustomersContextData = {
  isLoading: boolean;
  customers: Customer[];
  page: number;
  totalOfPage: number;
  setPage: (page: number) => void;
  addCustomer: (data: CustomerFormData) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
  updateCustomers: (id: number, data: CustomerFormData) => Promise<void>;
};

export const formSchema = z
  .object({
    nome: z.string().min(3, {
      message: "Nome deve ter no mínimo 3 caracteres!",
    }),
    email: z.string().email({
      message: "O e-mail deve ser vállido!",
    }),
    foto: z.string().url({
      message: "Foto deve ser no formato de link",
    }),
    telefone: z.string().regex(/^\(?\d{2}\)?\s?(9\d{4}|\d{4})[-\s]?\d{4}$/, {
      message:
        "Telefone deve estar no formato (11) 99999-9999 ou 11 99999-9999",
    }),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    leadScore: z.coerce
      .number()
      .min(0, { message: "LeadScore deve ser no mínimo 0" })
      .max(10, { message: "LeadScore deve ser no máximo 10" }),
    tipoPessoa: z.enum(["FISICA", "JURIDICA"], {
      required_error: "É necessário selecionar o tipo de pessoa.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.tipoPessoa === "FISICA") {
      if (
        !data.cpf ||
        !/(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{11}$)/.test(data.cpf)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cpf"],
          message: "CPF é obrigatório e deve estar em um formato válido.",
        });
      }
    }

    if (data.tipoPessoa === "JURIDICA") {
      if (
        !data.cnpj ||
        !/(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)|(^\d{14}$)/.test(data.cnpj)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["cnpj"],
          message: "CNPJ é obrigatório e deve estar em um formato válido.",
        });
      }
    }
  });

type CustomerFormData = z.infer<typeof formSchema>;

export const CustomersContext = createContext({} as CustomersContextData);

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [totalOfPage, setTotalOfPage] = useState(0);

  const fetchCustomers = useCallback(async () => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/clientes?pagina=${page}&tamanho=10&ordenarPor=id&direcao=asc`,
          {
            signal: controller.signal,
          }
        );

        setCustomers(response.data.content ?? []);
        setTotalOfPage(response.data.totalPages ?? 0);
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.name === "CanceledError") {
            console.log("Request canceled");
            return;
          }
          console.error("API Error:", e.response?.data.message);
          toast.error(
            e.response?.data.message || "Não foi possível carregar os clientes."
          );
        } else {
          console.error(e);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [page]);

  async function addCustomer(data: CustomerFormData) {
    try {
      setIsLoading(true);

      const { tipoPessoa, ...dataToSend } = data;

      await api.post("/clientes", dataToSend);
      toast.success("Cliente cadastrado com sucesso!");
      fetchCustomers();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message || "Não foi possível cadastrar o cliente"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCustomer(id: number) {
    try {
      setIsLoading(true);

      await api.delete(`/clientes/${id}`);
      fetchCustomers();
      toast.success(`Cliente com o id ${id}, deletado com sucesso`);
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

  async function updateCustomers(id: number, data: CustomerFormData) {
    try {
      setIsLoading(true);

      await api.put(`/clientes/${id}`, data);

      toast.success("Clientes atualizado com sucesso!");
      fetchCustomers();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(
          e.response?.data?.message || "Não foi possível atualizar o cliente."
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
        addCustomer,
        updateCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}
