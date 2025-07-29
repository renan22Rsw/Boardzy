import { getAuditLogs } from "@/lib/api/get-audit-logs";
import { ActivityList } from "./_components/activity-list";
import { BoardHeader } from "../_components/board-header";

const ActivityPage = async () => {
  const logs = await getAuditLogs();

  return (
    <div className="w-full space-y-4 px-4 py-10">
      <div className="px-4">
        <BoardHeader />
      </div>
      <ActivityList logs={logs} />
    </div>
  );
};

export default ActivityPage;
