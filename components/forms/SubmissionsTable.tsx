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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CustomButton } from "../reusable-comps/CustomButton";
import { Input } from "../ui/input";

const maxLength = 40;
const shouldHavePopOver = (s: string) => s.length >= maxLength;
const concatString = (s: string) =>
  s.length > maxLength ? s.slice(0, maxLength) + "..." : s;
const parseBoolean = (bool: boolean) => (bool ? "Yes" : "No");
export function SubmissionsTable({ id }: { id: string }) {
  const { data: form, isPending } = useGetSingleFormSubmissions(id);
  const maxLength = 40;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [currentSearchFilter, setCurrentSearchFilter] = useState("Name");
  const columns = useMemo(() => {
    // Only create columns if form data is available
    if (!form) return [];
    const columnHelper = createColumnHelper<Record<string, any>>();
    return [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          );
        },
      }),
      // Existing dynamic columns
      ...form.labels.map((label) =>
        columnHelper.accessor(label, {
          header: () => label,
          enableColumnFilter: true,
          // filterFn: (row, columnId, filterValue) => {
          //   const cellValue = row.getValue(columnId);
          //   if (typeof filterValue == "number") {
          //     return String(cellValue).includes(filterValue);
          //   }
          // },
          cell: (info) => {
            const value = info.getValue();
            if (Array.isArray(value)) return value.join(", ");
            if (typeof value === "boolean") return value ? "Yes" : "No";
            if (typeof value === "number") return "I am a number";
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
            if (typeof value == "string") {
              return value.trim().length > 0 ? value : "-";
            }
            return value;
          },
        })
      ),
    ];
  }, [form]);
  const tableData = useMemo(() => form?.submissions || [], [form]);
  // Create table instance
  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
    },
  });

  if (isPending) return <MiniLoader />;
  if (!form)
    return <ErrorMessage message="Sorry, no submissions found for this form" />;
  return (
    <div>
      <div className="w-full justify-between items-center mt-4 flex">
        <div className="w-full flex gap-2">
          <Input
            value={
              (table
                .getColumn(currentSearchFilter)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(currentSearchFilter)
                ?.setFilterValue(event.target.value)
            }
            placeholder={`Search by ${currentSearchFilter}`}
            className="max-w-sm"
          />
          <Select
            onValueChange={(e) => setCurrentSearchFilter(e)}
            defaultValue={form.labels[0]}
          >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Search by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Search by</SelectLabel>
                {form.labels.map((label, i) => {
                  return (
                    <SelectItem key={i} value={label}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div></div>
        <div className="flex w-full items-end gap-2  justify-end">
          <CustomButton>Export as csv</CustomButton>
          <div className="space-x-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="icon"
              variant={"outline"}
              className="h-8 w-8"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="icon"
              variant={"outline"}
              className="h-8 w-8"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <Table className="mt-4">
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground font-[500]"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="w-full flex items-center justify-center mt-4">
        <p className="text-muted-foreground font-[500] text-[15px]">
          {" "}
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>
      </div>
    </div>
  );
}
