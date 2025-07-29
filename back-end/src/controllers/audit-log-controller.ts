import { getAuth } from "@clerk/express";
import { AuditLogService } from "../services/audit-log-service";
import { Request, Response } from "express";

export class AuditLogController {
  constructor(private auditLogService: AuditLogService) {}

  async getAllAuditLogs(req: Request, res: Response): Promise<any> {
    try {
      const { orgId } = getAuth(req);
      const auditLogs = await this.auditLogService.getAllAuditLogs(
        orgId as string
      );
      return res.status(200).send(auditLogs);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          error: err.message,
        });
      }
      return res.status(500).send({ error: "Unexpected error" });
    }
  }
}
