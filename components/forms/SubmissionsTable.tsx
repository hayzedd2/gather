"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetSingleFormSubmissions } from "@/hooks/useGetSingleFormSubmissions";
import MiniLoader from "../reusable-comps/MiniLoader";
import ErrorMessage from "../reusable-comps/ErrorMessage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import { CustomButton } from "../reusable-comps/CustomButton";
import { Input } from "../ui/input";
import Floater from "../reusable-comps/Floater";
import { useDeleteSelectedSubmissions } from "@/hooks/useDeleteSelectedSubmissions";
import { toast } from "sonner";
import { SvgLoading } from "../reusable-comps/SvgLoading";
import ExportSelector from "../reusable-comps/ExportSelector";
import SearchSelector from "./SearchSelector";
import { format } from "date-fns";

function isISODate(value: any): boolean {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) &&
    !isNaN(Date.parse(value))
  );
}
export function SubmissionsTable({ id }: { id: string }) {
  const { data: form, isPending } = useGetSingleFormSubmissions(id);
  const { mutate: deleteSubmissions, isPending: isDeleting } =
    useDeleteSelectedSubmissions(id);
  const maxLength = 40;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [currentSearchFilter, setCurrentSearchFilter] = useState<string | null>(
    null
  );
  useEffect(() => {
    console.log(form);
  }, [form]);
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
          filterFn: (row, columnId, filterValue) => {
            const cellValue = row.getValue(columnId);
            return String(cellValue)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
          },
          cell: (info) => {
            const value = info.getValue();
            if (Array.isArray(value)) return value.join(", ");
            if (isISODate(value)) {
              return format(value, "PPP");
            }
            if (typeof value === "boolean") return value ? "Yes" : "No";
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
      <Floater
        isOpen={table.getFilteredSelectedRowModel().rows.length > 0}
        onClose={() => console.log("Closed!")}
      >
        <div className="flex items-center w-full justify-between">
          <p className="text-black ml-3 font-[500] text-[15px]">
            {table.getFilteredSelectedRowModel().rows.length} row
            {table.getFilteredSelectedRowModel().rows.length != 1 && "s"}{" "}
            selected
          </p>
          <div className="space-x-1.5">
            <CustomButton
              className="flex gap-2"
              variant="destructive"
              disabled={isDeleting}
              onClick={() => {
                deleteSubmissions(
                  table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original.unique_form_submission_id),
                  {
                    onSuccess: (data) => {
                      toast.success(data.deletedCount + " " + data.message);
                    },
                    onError(error) {
                      toast.error(error.message);
                    },
                  }
                );
              }}
            >
              {isDeleting && <SvgLoading />}
              <span> Delete rows</span>
            </CustomButton>
          </div>
        </div>
      </Floater>
      <div className="w-full justify-between gap-2 flex-wrap md:flex-nowrap px-2 items-center mt-4 flex">
        <div className="w-full flex gap-2 ">
          <div className="flex w-full rounded-md items-center bg-white px-2 text-base light-shadow ">
            <Input
              value={
                (table
                  .getColumn(
                    !currentSearchFilter ? form.labels[0] : currentSearchFilter
                  )
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(
                    !currentSearchFilter ? form.labels[0] : currentSearchFilter
                  )
                  ?.setFilterValue(event.target.value)
              }
              placeholder={`Search by ${
                !currentSearchFilter ? form.labels[0] : currentSearchFilter
              }`}
              className="flex-1 placeholder:text-[14px] shadow-none border-none focus:outline-none focus-visible:ring-0 focus:border-none"
            />
            <SearchSelector
              onSelectSearchBy={(s) => {
                setCurrentSearchFilter(s);
              }}
              searchByOptions={form.labels}
              defaultValue={currentSearchFilter ?? form.labels[0]}
            />
          </div>
        </div>

        <div className="flex w-full items-end gap-2  justify-between md:justify-end">
          <ExportSelector
            data={form.submissions.map(
              ({ unique_form_submission_id, ...rest }) => rest
            )}
            fileName={form.title}
          />
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
      <div className="w-full flex items-center px-2 mt-4">
        <p className="text-muted-foreground font-[500] text-[15px]">
          {" "}
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>
      </div>
    </div>
  );
}
