import type { SyntheticEvent } from "react";
import type { Customer } from "@/models/Customers";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";

const PLACEHOLDER_IMG =
  "https://ik.imagekit.io/brunogodoy/placeholder.jpg?updatedAt=1751288384316";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "foto",
    header: "Foto",
    cell: ({ row }) => {
      const fotoUrl = row.getValue("foto") as string;

      const imageSrc = fotoUrl || PLACEHOLDER_IMG;

      const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = PLACEHOLDER_IMG;
      };

      return (
        <img
          className="rounded-full object-cover h-10 w-10"
          src={imageSrc}
          alt={`Foto de ${row.getValue("nome")}`}
          onError={handleImageError}
        />
      );
    },
  },
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => {
      return <div>{row.getValue("nome")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => {
      return <div>{row.getValue("telefone")}</div>;
    },
  },
  {
    accessorKey: "tipoPessoa",
    header: "Tipo Pessoa",
    cell: ({ row }) => {
      return <div>{row.getValue("tipoPessoa")}</div>;
    },
  },
  {
    accessorKey: "leadScore",
    header: "Lead Score",
    cell: ({ row }) => {
      return <div>{row.getValue("leadScore")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Última Atualização",
    cell: ({ row }) => {
      const dateString = row.getValue("updatedAt") as string;

      if (!dateString) {
        return <span>-</span>;
      }

      const date = new Date(dateString);
      const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);

      return <div>{formattedDate}</div>;
    },
  },
];

interface Props {
  customers: Customer[];
}

export default function CustomersDataTable({ customers }: Props) {
  return <DataTable columns={columns} data={customers} />;
}
