import { Router } from "express";
import { AuditLogController } from "../controllers/audit-log-controller";
import { AuditLogService } from "../services/audit-log-service";

export const auditLogRouter = Router();

const auditLogService = new AuditLogService();
const auditLogController = new AuditLogController(auditLogService);

auditLogRouter.get("/logs", (req, res) =>
  auditLogController.getAllAuditLogs(req, res)
);
