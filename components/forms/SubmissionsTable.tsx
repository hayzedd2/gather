"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetSingleFormSubmissions } from "@/hooks/useGetSingleFormSubmissions";
import SubmissionPagination from "./SubmissionPagintaion";
import { useSearchParams } from "next/navigation";
import MiniLoader from "../reusable-comps/MiniLoader";
import ErrorMessage from "../reusable-comps/ErrorMessage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ExportCSV from "../reusable-comps/ExportCSV";
import { useMemo } from "react";

const maxLength = 40;
const shouldHavePopOver = (s: string) => s.length >= maxLength;
const concatString = (s: string) =>
  s.length > maxLength ? s.slice(0, maxLength) + "..." : s;
const parseBoolean = (bool: boolean) => (bool ? "Yes" : "No");
export function SubmissionsTable({ id }: { id: string }) {
  const { data: form, isPending } = useGetSingleFormSubmissions(id);
  const maxLength = 40;
  const columns = useMemo(() => {
    // Only create columns if form data is available
    if (!form) return [];
    const columnHelper = createColumnHelper<Record<string, any>>();
    return form.labels.map((label) =>
      columnHelper.accessor(label, {
        header: () => label,
        cell: (info) => {
          const value = info.getValue();
          if (Array.isArray(value)) {
            return value.join(", ");
          }
          if (typeof value === "boolean") {
            return value ? "Yes" : "No";
          }
          if (typeof value === "string" && value.length > maxLength) {
            return (
              <Popover>
                <PopoverTrigger>
                  {value.slice(0, maxLength) + "..."}
                </PopoverTrigger>
                <PopoverContent>{value}</PopoverContent>
              </Popover>
            );
          }
          return value ?? "-";
        },
      })
    );
  }, [form, maxLength]);
  const tableData = useMemo(() => form?.submissions || [], [form]);

  // Create table instance
  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });
  if (isPending) return <MiniLoader />;
  if (!form)
    return <ErrorMessage message="Sorry, no submissions found for this form" />;

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                className="w-fit shrink-0 whitespace-nowrap font-[500]"
                key={header.id}
              >
                {flexRender(
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
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="w-fit shrink-0 whitespace-nowrap"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
