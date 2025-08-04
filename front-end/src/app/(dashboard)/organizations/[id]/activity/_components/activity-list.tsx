"use client";

import { CardActivityMessage } from "@/app/(dashboard)/board/[id]/_components/modal/card-acitivity-message";
import { Logs } from "@/types/logs";
import { useEffect, useState } from "react";
import { ActivityListSkeleton } from "./activity-list-skeleton";

export const ActivityList = ({ logs }: { logs: Logs[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {logs.length === 0 ? (
        <h1 className="py-4 text-center text-zinc-300 dark:text-zinc-600">
          No activity found inside this organization
        </h1>
      ) : (
        <>
          {isLoading ? (
            <ActivityListSkeleton />
          ) : (
            logs.map((log) => <CardActivityMessage data={log} key={log.id} />)
          )}
        </>
      )}
    </div>
  );
};
