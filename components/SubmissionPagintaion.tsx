"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubmissionPagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      <div className="flex items-center w-full justify-end space-x-1">
        <Button size="icon" variant={"outline"} className="h-8 w-8" asChild>
          <Link
            href={createPageURL(currentPage - 1)}
            className={
              currentPage - 1 === 0 ? `pointer-events-none opacity-50` : ""
            }
            prefetch={true}
          >
            <ChevronLeft />
          </Link>
        </Button>
        <Button size="icon" variant={"outline"} className="h-8 w-8" asChild>
          <Link
            href={createPageURL(currentPage + 1)}
            className={
              currentPage >= totalPages ? `pointer-events-none opacity-50` : ""
            }
            prefetch={true}
          >
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
