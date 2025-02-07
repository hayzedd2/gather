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
import { Button } from "./ui/button";

interface submissionTableProps {
  submissions: {
    [x: string]: string | string[];
  }[];
  labels: string[];
  submissionsCount: number;
}
export function SubmissionsTable({
  submissions,
  submissionsCount,
  labels,
}: submissionTableProps) {
  return (
    <div className="mt-1">
      {/* <div className="flex w-full gap-2 mb-2 justify-end  items-end">
        <Button variant={"outline"}>Download csv</Button>
        <Button>Download json</Button>
      </div> */}
      <Table>
        <TableCaption>You have {submissionsCount} responses</TableCaption>
        <TableHeader>
          <TableRow>
            {labels.map((label, i) => {
              return <TableHead key={i}>{label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission, i) => (
            <TableRow key={i}>
              {labels.map((label, j) => (
                <TableCell key={j}>
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
