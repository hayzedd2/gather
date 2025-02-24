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
import MiniLoader from "./MiniLoader";
import ErrorMessage from "./ErrorMessage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export function SubmissionsTable({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const skip = (currentPage - 1) * limit;
  const { data: form, isPending } = useGetSingleFormSubmissions(id);
  if (isPending) {
    return <MiniLoader />;
  }
  if (!form) {
    return <ErrorMessage message="Sorry, no submissions found for this form" />;
  }
  const totalPages = Math.ceil(form.submissionsCount / 10);
  const maxLength = 40;
  const shouldHavePopOver = (s: string) => {
    return s.length >= maxLength;
  };
  const concatString = (s: string) => {
    return s.slice(0, maxLength).concat("...");
  };
  const parseBoolean=(bool:boolean)=>{
    return bool ? "Yes":"No"
  }
  return (
    <div className="mt-1">
      <SubmissionPagination totalPages={totalPages} />

      <div className=" my-3  hide-scrollbar">
        {" "}
        <Table className=" ">
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
            {form.submissions.slice(skip, limit + skip).map((submission, i) => (
              <TableRow key={i} className="border-0 dotted-down">
                {form.labels.map((label, j) => (
                  <TableCell
                    className="text-[14px] text-regular font-[500]"
                    key={j}
                  >
                    {Array.isArray(submission[label]) ? (
                      submission[label].join(", ")
                    ) : shouldHavePopOver(submission[label]) ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <p className="cursor-pointer">
                            {concatString(submission[label])}
                          </p>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 shadow-none">
                          <div className="space-y-2">
                            <p className="text-sm">{submission[label]}</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span>
                        {" "}
                        {typeof submission[label] === "boolean"
                          ? parseBoolean(submission[label])
                          : submission[label]}
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full  flex items-center justify-center">
        <p className="text-[15px] text-muted-foreground font-[500]">
          You have {form.submissionsCount} submission
          {form.submissionsCount != 1 && "s"}
        </p>
      </div>
    </div>
  );
}
