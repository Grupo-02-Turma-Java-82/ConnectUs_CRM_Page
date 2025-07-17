import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { useCustomers } from "@/hooks/useCustomers";
import { formSchema } from "@/contexts/CustomersContext";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Customer } from "@/models/Customers";

type FormCustomersProps = {
  isEditMode: boolean;
  initialData?: Customer | null;
  onClose?: () => void;
};

export function FormCustomers({
  isEditMode,
  initialData,
  onClose,
}: FormCustomersProps) {
  const { addCustomer, updateCustomers } = useCustomers();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      foto: "",
      telefone: "",
      cpf: "",
      cnpj: "",
      leadScore: 0,
      tipoPessoa: "FISICA",
    },
  });

  const tipoPessoa = form.watch("tipoPessoa");

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        nome: initialData.nome,
        email: initialData.email,
        foto: initialData.foto,
        telefone: initialData.telefone,
        cpf: initialData.cpf || "",
        cnpj: initialData.cnpj || "",
        leadScore: initialData.leadScore ?? 0,
        tipoPessoa: initialData.cpf ? "FISICA" : "JURIDICA",
      });
    }
  }, [isEditMode, initialData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSend: z.infer<typeof formSchema> = {
      nome: values.nome,
      email: values.email,
      foto: values.foto,
      telefone: values.telefone,
      leadScore: values.leadScore,
      tipoPessoa: values.tipoPessoa,
      cpf: values.tipoPessoa === "FISICA" ? values.cpf : undefined,
      cnpj: values.tipoPessoa === "JURIDICA" ? values.cnpj : undefined,
    };

    if (values.tipoPessoa === "FISICA" && values.cpf) {
      dataToSend.cpf = values.cpf;
    }

    if (values.tipoPessoa === "JURIDICA" && values.cnpj) {
      dataToSend.cnpj = values.cnpj;
    }

    if (isEditMode && initialData) {
      await updateCustomers(initialData.id, dataToSend);
    } else {
      await addCustomer(dataToSend);
    }

    if (onClose) onClose();
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-card border p-6 rounded-lg"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            control={form.control}
            name="nome"
            label="Nome *"
            placeholder="Digite o nome do cliente..."
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email *"
            placeholder="Digite o email do cliente..."
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            control={form.control}
            name="foto"
            label="Foto"
            placeholder="Digite o link da foto do cliente..."
          />
          <FormInput
            control={form.control}
            name="telefone"
            label="Telefone *"
            placeholder="Digite o telefone do cliente..."
          />
        </div>

        <FormInput
          control={form.control}
          name="leadScore"
          label="LeadScore"
          type="number"
          placeholder="Digite o leadScore do cliente..."
        />

        <FormField
          control={form.control}
          name="tipoPessoa"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo de Pessoa *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex items-center space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="FISICA" />
                    </FormControl>
                    <FormLabel className="font-normal">Pessoa Física</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="JURIDICA" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Pessoa Jurídica
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {tipoPessoa === "FISICA" && (
            <FormInput
              control={form.control}
              name="cpf"
              label="CPF *"
              placeholder="Digite o CPF do cliente..."
            />
          )}
          {tipoPessoa === "JURIDICA" && (
            <FormInput
              control={form.control}
              name="cnpj"
              label="CNPJ *"
              placeholder="Digite o CNPJ do cliente..."
            />
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="cursor-pointer">
            {isEditMode ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
