import { Skeleton } from "@/components/ui/skeleton";

export const FormSkeletonLoader = () => {
  return (
    <>
      <div className="search flex mt-8 gap-1 flex-col">
        <Skeleton className="h-[8px] w-[120px] mb-2"/>
        <Skeleton className="w-full h-8" />
      </div>
      <div className="flex flex-col mt-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <div key={i}>
              <SingleSkeleton />
            </div>
          );
        })}
      </div>
    </>
  );
};

const SingleSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between p-3">
      <div className="flex flex-col  w-full space-y-2">
        <Skeleton className="h-[8px] w-[150px] rounded-xl" />
        <div className="flex gap-4">
          <Skeleton className="h-[8px] w-[100px]" />
          <Skeleton className="h-[8px] w-[100px]" />
          <Skeleton className="h-[8px] w-[100px]" />
        </div>
      </div>
      <Skeleton className="w-6 h-6 rounded-md" />
    </div>
  );
};
