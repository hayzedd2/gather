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

export function SubmissionsTable({ id }: { id: string }) {
  const { data: submissions, isPending } = useGetSingleFormSubmissions(id);
  if (isPending) {
    return <div>Loading..</div>;
  }
  if (!submissions) {
    return <div>Empty submissions</div>;
  }
  return (
    <div className="mt-1">
      <div className="flex w-full gap-2 mb-2 justify-end  items-end">
        <Button variant={"outline"}>Download csv</Button>
        <Button>Download json</Button>
      </div>
      <Table>
        <TableCaption>
          You have {submissions.submissionsCount} responses
        </TableCaption>
        <TableHeader>
          <TableRow>
            {submissions.labels.map((label, i) => {
              return <TableHead key={i}>{label}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.submissions.map((submission, i) => (
            <TableRow key={i}>
              {submissions.labels.map((label, j) => (
                <TableCell key={j}>{submission[label] || ""}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
