import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* <Skeleton className="h-12 w-12 rounded-full" /> */}
      <div className="my-10 flex justify-between items-center space-x-2 mt-5">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="grid grid-cols-1 gap-4 pt-20">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
    </div>
  );
}
