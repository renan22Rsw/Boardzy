import { Logs, ACTION } from "@/types/logs";

export const generateMessageLog = (log: Logs) => {
  const { entityTitle, action, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLocaleLowerCase()} to ${entityTitle} `;
    case ACTION.UPDATE:
      return `updated ${entityType.toLocaleLowerCase()} to ${entityTitle} `;
    case ACTION.DELETE:
      return `deleted ${entityType.toLocaleLowerCase()} from ${entityTitle} `;
    default:
      return "";
  }
};
