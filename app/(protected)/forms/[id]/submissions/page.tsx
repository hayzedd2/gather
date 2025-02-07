import { getSubmissions } from "@/actions/getSubmissions";
import SubmissionPagination from "@/components/SubmissionPagintaion";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
}) {
  const id = (await params).id;
  const sParams = await searchParams;
  const currentPage = Number(sParams?.page) || 1;
  const limit = Number(sParams?.limit) || 10;
  const skip = (currentPage - 1) * limit;
  const { error, totalPages, labels, submissionsCount, submissions } =
    await getSubmissions({ skip, limit, id });
  if (error) {
    return <div>An error ocuured</div>;
  }

  if (!labels || !submissions || !submissionsCount || !totalPages) {
    return <>Empty!!</>;
  }
  return (
    <div>
      <SubmissionPagination totalPages={totalPages} />
      <Suspense key={currentPage} fallback={<>Loading..</>}>
        <SubmissionsTable
          labels={labels}
          submissions={submissions}
          submissionsCount={submissionsCount}
        />
      </Suspense>
    </div>
  );
}
