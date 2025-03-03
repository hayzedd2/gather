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

export function SubmissionsTable({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const { data: form, isPending } = useGetSingleFormSubmissions(id);

  if (isPending) return <MiniLoader />;
  if (!form)
    return <ErrorMessage message="Sorry, no submissions found for this form" />;

  const totalPages = Math.ceil(form.submissionsCount / limit);
  const maxLength = 40;

  const shouldHavePopOver = (s: string) => s.length >= maxLength;
  const concatString = (s: string) =>
    s.length > maxLength ? s.slice(0, maxLength) + "..." : s;
  const parseBoolean = (bool: boolean) => (bool ? "Yes" : "No");

  return (
    <div className="mt-1 px-3">
      <div className="flex w-full items-center justify-end space-x-2">
        <ExportCSV data={form.submissions} filename={`${form.title}.csv`} />
        <SubmissionPagination totalPages={totalPages} />
      </div>

      <div className="my-3 hide-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="hide-scrollbar">
              {form.labels.map((label, i) => (
                <TableHead key={i} className="w-[200px] min-w-[200px]">
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {form.submissions.slice(skip, skip + limit).map((submission, i) => (
              <TableRow key={i} className="border-0 dotted-down">
                {form.labels.map((label, j) => {
                  const value = submission[label];

                  if (Array.isArray(value)) {
                    return (
                      <TableCell key={j} className="text-[14px] font-[500]">
                        {value.join(", ")}
                      </TableCell>
                    );
                  }

                  if (typeof value === "boolean") {
                    return (
                      <TableCell key={j} className="text-[14px] font-[500]">
                        {parseBoolean(value)}
                      </TableCell>
                    );
                  }

                  if (typeof value === "string" && shouldHavePopOver(value)) {
                    return (
                      <TableCell key={j} className="text-[14px] font-[500]">
                        <Popover>
                          <PopoverTrigger asChild>
                            <p className="cursor-pointer">
                              {concatString(value)}
                            </p>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 shadow-none">
                            <div className="space-y-2">
                              <p className="text-sm">{value}</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={j} className="text-[14px] font-[500]">
                      {value ?? "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Submission Count */}
      <div className="w-full flex items-center justify-center">
        <p className="text-[15px] text-muted-foreground font-[500]">
          You have {form.submissionsCount} submission
          {form.submissionsCount !== 1 && "s"}
        </p>
      </div>
    </div>
  );
}
