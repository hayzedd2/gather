
import { SubmissionsTable } from "@/components/SubmissionsTable";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <div>
      <SubmissionsTable id={id} />
    </div>
  );
}
