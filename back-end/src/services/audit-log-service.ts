import db from "../db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

export interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle?: string;
  action?: ACTION;
  user?: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  image: string;
}

export class AuditLogService {
  async createAuditLog(props: Props, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization id is required");
      }

      const { entityId, entityType, entityTitle, action, user } = props;

      const auditLogs = await db.auditLog.create({
        data: {
          orgId,
          entityId,
          entityType,
          entityTitle: entityTitle as string,
          action: action as ACTION,
          userId: user?.id as string,
          userImage: user?.image as string,
          userName: (user?.firstName + " " + user?.lastName) as string,
        },
      });

      return auditLogs;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async getAllAuditLogs(orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization id is required");
      }

      const auditLogs = await db.auditLog.findMany({
        where: {
          orgId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return auditLogs;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }

  async getCardAuditLogs(props: Props, orgId: string) {
    try {
      if (!orgId) {
        throw new Error("Organization id is required");
      }

      const { entityId, entityType } = props;

      const auditLogs = await db.auditLog.findMany({
        where: {
          orgId,
          entityId,
          entityType,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });
      return auditLogs;
    } catch (err) {
      if (err instanceof Error) {
        throw Error(err.message);
      }
      throw new Error("Unexpected error");
    }
  }
}
