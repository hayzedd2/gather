"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSingleFormSubmissions } from "@/hooks/useGetSingleFormSubmissions";
import { useState } from "react";
import SubmissionPagination from "./SubmissionPagintaion";
import { useSearchParams } from "next/navigation";
import MiniLoader from "./MiniLoader";
import ErrorMessage from "./ErrorMessage";

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
  return (
    <div className="mt-1">
      <SubmissionPagination totalPages={totalPages} />
      
      <Table>
        <TableCaption>
          You have {form.submissionsCount} submissions{" "}
        </TableCaption>
        <TableHeader>
          <TableRow>
            {form.labels.map((label, i) => {
              return <TableHead key={i}>{label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {form.submissions.slice(skip, limit + skip).map((submission, i) => (
            <TableRow key={i} className="border-0 dotted-down ">
              {form.labels.map((label, j) => (
                <TableCell className="text-[14px] text-regular font-[500]" key={j}>
                  {Array.isArray(submission[label])
                    ? submission[label].join(", ")
                    : submission[label] || ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
