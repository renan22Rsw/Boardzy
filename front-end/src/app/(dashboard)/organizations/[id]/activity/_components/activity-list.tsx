import { CardActivityMessage } from "@/app/(dashboard)/board/[id]/_components/modal/card-acitivity-message";
import { Logs } from "@/types/logs";

export const ActivityList = ({ logs }: { logs: Logs[] }) => {
  return (
    <div>
      {logs.length === 0 ? (
        <h1 className="py-4 text-center text-zinc-300 dark:text-zinc-600">
          No activity found inside this organization
        </h1>
      ) : (
        <>
          {logs.map((log) => (
            <CardActivityMessage data={log} key={log.id} />
          ))}
        </>
      )}
    </div>
  );
};
