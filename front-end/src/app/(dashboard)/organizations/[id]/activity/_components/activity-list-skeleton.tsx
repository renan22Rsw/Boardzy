import { Skeleton } from "@/components/ui/skeleton";

export const ActivityListSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="mx-6 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
          <Skeleton className="h-[15px] w-[150px]" />
        </div>
        <div className="mx-12">
          <Skeleton className="h-[10px] w-[250px]" />
        </div>
      </div>
      <div className="mx-6 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
          <Skeleton className="h-[15px] w-[150px]" />
        </div>
        <div className="mx-12">
          <Skeleton className="h-[10px] w-[250px]" />
        </div>
      </div>
    </div>
  );
};
