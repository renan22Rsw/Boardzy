import {
  ACTION,
  AuditLog,
} from "../../../../../../../../back-end/src/generated/prisma";

export const generateMessageLog = (log: AuditLog) => {
  const { entityTitle, action, entityType } = log;

  switch (action) {
    case ACTION.CREATE:
      return `created ${entityType.toLocaleLowerCase()} ${entityTitle} `;
    case ACTION.UPDATE:
      return `updated ${entityType.toLocaleLowerCase()} to ${entityTitle} `;
    case ACTION.DELETE:
      return `deleted ${entityType.toLocaleLowerCase()} ${entityTitle}`;
    default:
      return "";
  }
};
