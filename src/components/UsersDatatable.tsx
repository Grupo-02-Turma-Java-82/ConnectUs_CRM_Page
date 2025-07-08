import type { SyntheticEvent } from "react";
import type { Users } from "@/models/Users";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/datatable";

const PLACEHOLDER_IMG =
  "https://ik.imagekit.io/brunogodoy/placeholder.jpg?updatedAt=1751288384316";

export const columns: ColumnDef<Users>[] = [
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
    accessorKey: "cargo",
    header: "Cargo",
    cell: ({ row }) => {
      return <div>{row.getValue("cargo")}</div>;
    },
  },
];
interface Props {
  users: Users[];
}
export default function UsersDataTable({ users }: Props) {
  return <DataTable<Users, unknown> columns={columns} data={users} />;
}
