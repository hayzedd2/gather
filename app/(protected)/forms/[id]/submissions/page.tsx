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
  const limit = 10;
  const skip = (currentPage - 1) * limit;
  const result = await getSubmissions({ skip, limit, id });
  if (result.error) {
    return <div>An error ocuured {result.error}</div>;
  }

  if (!result.submissions?.length) {
    return <div className="text-gray-500">No submissions found</div>;
  }
  return (
    <div>
      <SubmissionPagination totalPages={result.totalPages} />
      <Suspense key={currentPage} fallback={<>Loading..</>}>
        <SubmissionsTable
          labels={result.labels}
          submissions={result.submissions}
          submissionsCount={result.submissionsCount}
        />
      </Suspense>
    </div>
  );
}
