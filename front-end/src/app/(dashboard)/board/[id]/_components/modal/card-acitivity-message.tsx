import { AvatarImage } from "@radix-ui/react-avatar";
import { AuditLog } from "../../../../../../../../back-end/src/generated/prisma";
import { generateMessageLog } from "./generate-message-log";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";

interface CardActivityMessageProps {
  data: AuditLog;
}

export const CardActivityMessage = ({ data }: CardActivityMessageProps) => {
  return (
    <div className="mx-6 flex gap-x-2 py-2">
      <Avatar>
        <AvatarImage src={data.userImage} />
      </Avatar>
      <span className="gap-x-0.5 text-sm font-semibold text-zinc-600">
        <h6 className="text-zinc-800 dark:text-zinc-300">{data.userName}</h6>
        {generateMessageLog(data)}
        <span className="text-xs text-zinc-500">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </span>
      </span>
    </div>
  );
};
