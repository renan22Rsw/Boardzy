import { Skeleton } from "@/components/ui/skeleton";

export const SidebarSkeleton = () => {
  return (
    <div className="w-[255px] space-y-12 px-2 pt-10">
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-[20px] w-[150px]" />
        <Skeleton className="h-[20px] w-[20px] rounded-full" />
      </div>
      <div className="space-y-8">
        <div className="flex items-center space-x-2 px-4">
          <Skeleton className="h-[40px] w-[40px] rounded-md" />
          <Skeleton className="h-[20px] w-[150px]" />
        </div>
        <div className="flex items-center space-x-2 px-4">
          <Skeleton className="h-[40px] w-[40px] rounded-md" />
          <Skeleton className="h-[20px] w-[150px]" />
        </div>
        <div className="flex items-center space-x-2 px-4">
          <Skeleton className="h-[40px] w-[40px] rounded-md" />
          <Skeleton className="h-[20px] w-[150px]" />
        </div>
      </div>
    </div>
  );
};
