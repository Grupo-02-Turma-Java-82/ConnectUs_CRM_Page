import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { EmptyTable } from "../EmptyTable";
import { Edit, SearchIcon, Trash2 } from "lucide-react";
import { FormCustomers } from "../FormCustomers";
import { FormOpportunities } from "../FormOpportunities";
import { FormUsers } from "../FormUsers";

import type { Customer } from "@/models/Customers";
import type { Oportunities } from "@/models/Oportunities";
import type { Users } from "@/models/Users";

interface DataTableProps<TData extends { id: number; nome: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleDelete?: (id: number) => void;
  tableFor: "Clientes" | "Oportunidades" | "Usuários";
}

export function DataTable<TData extends { id: number; nome: string }, TValue>({
  columns,
  data,
  handleDelete,
  tableFor,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TData | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  const noResultsAfterFilter =
    table.getRowModel().rows?.length === 0 && globalFilter !== "";
  const tableIsInitiallyEmpty = data.length === 0;

  if (tableIsInitiallyEmpty) {
    return (
      <EmptyTable
        icon="archive-x"
        iconSize={44}
        title="Não há dados disponíveis"
      />
    );
  }

  const renderEditForm = () => {
    switch (tableFor) {
      case "Clientes":
        return (
          <FormCustomers
            isEditMode={true}
            initialData={selectedRow as Customer | null}
            onClose={() => setEditDialogOpen(false)}
          />
        );
      case "Oportunidades":
        return (
          <FormOpportunities
            isEditMode={true}
            initialData={selectedRow as Oportunities | null}
            onClose={() => setEditDialogOpen(false)}
          />
        );
      case "Usuários":
        return (
          <FormUsers
            isEditMode={true}
            initialData={selectedRow as Users | null}
            onClose={() => setEditDialogOpen(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="rounded-md border bg-card p-4">
        <div className="relative flex-1 max-w-sm mb-4">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Buscar por ${tableFor}...`}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <DropdownMenu key={row.id}>
                <AlertDialog>
                  <DropdownMenuTrigger asChild>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    side="top"
                    className="bg-card border py-2 px-2 space-y-1 rounded-lg shadow-lg"
                  >
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        setSelectedRow(row.original);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit size={16} className="mr-2" />
                      <span>Editar</span>
                    </DropdownMenuItem>

                    {tableFor !== "Usuários" && (
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="flex items-center focus:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 size={16} className="mr-2" />
                          <span>Remover</span>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    )}
                  </DropdownMenuContent>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Você tem certeza absoluta?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isto irá apagar
                        permanentemente o registro dos(as) {tableFor} dos nossos
                        servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleDelete && handleDelete(row.original.id)
                        }
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Confirmar Exclusão
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenu>
            ))}
            {noResultsAfterFilter && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <EmptyTable
                    icon="search-x"
                    title="Nenhum resultado encontrado"
                    iconSize={44}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar {tableFor}</DialogTitle>
            <DialogDescription>
              Faça alterações nos dados dos(as) {tableFor} aqui. Clique em
              salvar quando terminar.
            </DialogDescription>
          </DialogHeader>

          {renderEditForm()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
