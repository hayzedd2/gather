import Link from "next/link";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleFormViewSkeleton() {
  return (
    <div>
      <Link href="/forms" className="my-6 gap-1 px-3 flex items-center">
        <ChevronLeft size={18} />
        <span className="mt-[2px] font-[500]">Back</span>
      </Link>
      <div className="flex px-3 justify-between w-full items-center">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>
      <SingleFormOptionsTabSkeleton />
    </div>
  );
}

function SingleFormOptionsTabSkeleton() {
  return (
    <div className="flex gap-3 mt-3 px-3 ">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </div>
  );
}
