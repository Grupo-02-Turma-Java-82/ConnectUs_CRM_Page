import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "./FormInput";
import { Button } from "./ui/button";
import { useUsers } from "@/hooks/userUsers";
import { userFormSchema, type UserFormData } from "@/contexts/UsersContext";
import type { Users } from "@/models/Users";

type FormCustomersProps = {
  isEditMode: boolean;
  initialData?: Users | null;
  onClose?: () => void;
};

export function FormUsers({
  isEditMode,
  initialData,
  onClose,
}: FormCustomersProps) {
  const { addUsers, updateUser } = useUsers();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      foto: "",
      telefone: "",
      cargo: "",
    },
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      form.reset({
        nome: initialData.nome,
        email: initialData.email,
        senha: "",
        foto: initialData.foto ?? "",
        telefone: initialData.telefone ?? "",
        cargo: initialData.cargo,
      });
    }
  }, [isEditMode, initialData, form]);

  async function onSubmit(values: UserFormData) {
    const dataToSend = { ...values };
    if (isEditMode && !dataToSend.senha) {
      delete (dataToSend as Partial<UserFormData>).senha;
    }

    if (isEditMode && initialData) {
      await updateUser(initialData.id, dataToSend);
    } else {
      await addUsers(dataToSend);
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
            placeholder="Digite o nome do usuário..."
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email *"
            type="email"
            placeholder="Digite o email do usuário..."
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            control={form.control}
            name="senha"
            label="Senha *"
            type="password"
            placeholder={
              isEditMode
                ? "Deixe em branco para não alterar"
                : "Digite a senha..."
            }
          />
          <FormInput
            control={form.control}
            name="cargo"
            label="Cargo *"
            placeholder="Ex: Vendedor, Gerente..."
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            control={form.control}
            name="foto"
            label="Foto (URL)"
            placeholder="Cole o link da foto do usuário..."
          />
          <FormInput
            control={form.control}
            name="telefone"
            label="Telefone"
            placeholder="Digite o telefone do usuário..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="cursor-pointer">
            {isEditMode ? "Atualizar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
