import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInput } from "./FormInput";
import { useOportunities } from "@/hooks/useOportunities";
import { formSchema, opportunityStatus } from "@/contexts/OportinitiesContext";
import { useUsers } from "@/hooks/userUsers";
import { useCustomers } from "@/hooks/useCustomers";
import { TextareaInput } from "./TextareaInput";

type FormOpportunitiesProps = {
  onClose?: () => void;
};

export function FormOpportunities({ onClose }: FormOpportunitiesProps) {
  const { addOpportunities } = useOportunities();
  const { users } = useUsers();
  const { customers } = useCustomers();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      descricao: "",
      valorEstimado: 0,
      status: "NOVA",
      usuario: { id: undefined },
      cliente: { id: undefined },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addOpportunities(values);

    if (onClose) onClose();
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-card border p-6 rounded-lg"
      >
        <FormInput
          control={form.control}
          name="titulo"
          label="Título da Oportunidade *"
          placeholder="Ex: Desenvolvimento de novo app"
        />

        <TextareaInput
          control={form.control}
          name="descricao"
          label="Descrição"
          placeholder="Detalhes sobre a oportunidade..."
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            control={form.control}
            name="valorEstimado"
            label="Valor Estimado (R$) *"
            type="number"
            placeholder="1500"
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {opportunityStatus.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="usuario.id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário Responsável *</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um usuário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cliente.id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente *</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={String(customer.id)}>
                        {customer.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="cursor-pointer">
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
